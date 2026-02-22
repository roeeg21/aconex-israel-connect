import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut, Search, Download, ChevronLeft, ChevronRight,
  Eye, FileText, Settings, BarChart3, X, Save,
} from "lucide-react";

type DemoRequest = {
  id: string;
  full_name: string;
  organization: string;
  email: string;
  phone: string | null;
  role: string | null;
  project_size: string | null;
  notes: string | null;
  email_verified: boolean;
  verification_date: string | null;
  submission_date: string;
  ip_address: string | null;
  user_agent: string | null;
  status: "new" | "in_progress" | "contacted" | "closed";
  admin_notes: string | null;
};

type AdminSettings = {
  id: string;
  notification_email_primary: string | null;
  notification_email_secondary: string | null;
  notifications_enabled: boolean;
  last_updated: string;
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  contacted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const PAGE_SIZE = 10;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"overview" | "requests" | "settings">("overview");
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    primary: "",
    secondary: "",
    enabled: true,
  });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    last7Days: 0,
    unreviewed: 0,
    verified: 0,
    lastSubmission: null as string | null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/adminlogin");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) {
        navigate("/adminlogin");
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("demo_requests")
      .select("*", { count: "exact" })
      .order("submission_date", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter as "new" | "in_progress" | "contacted" | "closed");
    }
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,organization.ilike.%${search}%,email.ilike.%${search}%`);
    }

    query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    const { data, count, error } = await query;
    if (error) {
      console.error("Fetch error:", error);
    } else {
      setRequests((data || []) as DemoRequest[]);
      setTotalCount(count || 0);
    }
    setLoading(false);
  }, [page, statusFilter, search]);

  const fetchStats = useCallback(async () => {
    const { data: all } = await supabase.from("demo_requests").select("submission_date, status, email_verified");
    if (!all) return;

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    setStats({
      total: all.length,
      last7Days: all.filter((r) => new Date(r.submission_date) >= sevenDaysAgo).length,
      unreviewed: all.filter((r) => r.status === "new").length,
      verified: all.filter((r) => r.email_verified).length,
      lastSubmission: all.length > 0 ? all.sort((a, b) => new Date(b.submission_date).getTime() - new Date(a.submission_date).getTime())[0].submission_date : null,
    });
  }, []);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from("admin_settings").select("*").limit(1).single();
    if (data) {
      const s = data as AdminSettings;
      setSettings(s);
      setSettingsForm({
        primary: s.notification_email_primary || "",
        secondary: s.notification_email_secondary || "",
        enabled: s.notifications_enabled,
      });
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    fetchStats();
    fetchSettings();
  }, [fetchRequests, fetchStats, fetchSettings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/adminlogin");
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;
    const { error } = await supabase
      .from("demo_requests")
      .update({
        status: editStatus as DemoRequest["status"],
        admin_notes: editNotes,
      })
      .eq("id", selectedRequest.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update.", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Request updated successfully." });
      setSelectedRequest(null);
      fetchRequests();
      fetchStats();
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    const { error } = await supabase
      .from("admin_settings")
      .update({
        notification_email_primary: settingsForm.primary || null,
        notification_email_secondary: settingsForm.secondary || null,
        notifications_enabled: settingsForm.enabled,
        last_updated: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Notification settings updated." });
      fetchSettings();
    }
  };

  const exportCSV = () => {
    if (requests.length === 0) return;
    const headers = ["ID", "Name", "Organization", "Email", "Phone", "Role", "Project Size", "Date", "Verified", "Status"];
    const rows = requests.map((r) => [
      r.id, r.full_name, r.organization, r.email, r.phone || "", r.role || "",
      r.project_size || "", new Date(r.submission_date).toLocaleDateString(),
      r.email_verified ? "Yes" : "No", r.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demo-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="font-display font-bold text-lg">Megatec Admin</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground hover:text-primary-foreground/80">
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-border">
            {[
              { key: "overview", label: "Overview", icon: BarChart3 },
              { key: "requests", label: "Requests", icon: FileText },
              { key: "settings", label: "Settings", icon: Settings },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key as typeof tab)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  tab === key
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {tab === "overview" && (
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Requests", value: stats.total, color: "text-primary" },
                { label: "Last 7 Days", value: stats.last7Days, color: "text-accent" },
                { label: "Unreviewed", value: stats.unreviewed, color: "text-destructive" },
                { label: "Verified Emails", value: stats.verified, color: "text-green-600" },
              ].map((s) => (
                <div key={s.label} className="bg-card rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
              {stats.lastSubmission && (
                <div className="sm:col-span-2 lg:col-span-4 bg-card rounded-xl p-5 border border-border">
                  <p className="text-sm text-muted-foreground">Last Submission</p>
                  <p className="text-foreground font-medium mt-1">{new Date(stats.lastSubmission).toLocaleString()}</p>
                </div>
              )}
              </div>
            </ScrollReveal>
          )}

          {/* Requests Tab */}
          {tab === "requests" && (
            <ScrollReveal>
              <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                      placeholder="Search name, org, email..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                <Button variant="outline" size="sm" onClick={exportCSV}>
                  <Download size={14} className="mr-1" /> CSV
                </Button>
              </div>

              {/* Table */}
              <div className="bg-card rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Organization</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Verified</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Loading...</td></tr>
                    ) : requests.length === 0 ? (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No requests found.</td></tr>
                    ) : (
                      requests.map((r) => (
                        <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium">{r.full_name}</td>
                          <td className="p-3">{r.organization}</td>
                          <td className="p-3 text-muted-foreground">{r.email}</td>
                          <td className="p-3 text-muted-foreground">{new Date(r.submission_date).toLocaleDateString()}</td>
                          <td className="p-3">
                            <Badge variant={r.email_verified ? "default" : "secondary"} className="text-xs">
                              {r.email_verified ? "Yes" : "No"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[r.status]}`}>
                              {r.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRequest(r);
                                setEditNotes(r.admin_notes || "");
                                setEditStatus(r.status);
                              }}
                            >
                              <Eye size={14} className="mr-1" /> View
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, totalCount)} of {totalCount}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                      <ChevronLeft size={14} />
                    </Button>
                    <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              )}
              </div>
            </ScrollReveal>
          )}

          {/* Settings Tab */}
          {tab === "settings" && (
            <ScrollReveal>
              <div className="max-w-lg space-y-6">
              <div className="bg-card rounded-xl p-6 border border-border space-y-5">
                <h2 className="font-display font-bold text-lg text-foreground">Notification Settings</h2>
                <div className="space-y-1.5">
                  <Label>Primary Notification Email</Label>
                  <Input
                    value={settingsForm.primary}
                    onChange={(e) => setSettingsForm({ ...settingsForm, primary: e.target.value })}
                    placeholder="admin@megatec.co.il"
                    type="email"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary Notification Email (optional)</Label>
                  <Input
                    value={settingsForm.secondary}
                    onChange={(e) => setSettingsForm({ ...settingsForm, secondary: e.target.value })}
                    placeholder="manager@megatec.co.il"
                    type="email"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={settingsForm.enabled}
                    onCheckedChange={(checked) => setSettingsForm({ ...settingsForm, enabled: checked })}
                  />
                  <Label>Enable email notifications</Label>
                </div>
                <Button onClick={handleSaveSettings} className="bg-primary text-primary-foreground">
                  <Save size={14} className="mr-1" /> Save Settings
                </Button>
              </div>
              </div>
            </ScrollReveal>
          )}

          {/* Request Detail Modal */}
          {selectedRequest && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedRequest(null)}>
              <ScrollReveal className="w-full max-w-2xl">
                <div className="bg-card rounded-xl border border-border w-full max-h-[90vh] overflow-y-auto p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-foreground">Request Details</h2>
                  <button onClick={() => setSelectedRequest(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{selectedRequest.full_name}</span></div>
                  <div><span className="text-muted-foreground">Organization:</span> <span className="font-medium">{selectedRequest.organization}</span></div>
                  <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedRequest.email}</span></div>
                  <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedRequest.phone || "—"}</span></div>
                  <div><span className="text-muted-foreground">Role:</span> <span className="font-medium">{selectedRequest.role || "—"}</span></div>
                  <div><span className="text-muted-foreground">Project Size:</span> <span className="font-medium">{selectedRequest.project_size || "—"}</span></div>
                  <div><span className="text-muted-foreground">Submitted:</span> <span className="font-medium">{new Date(selectedRequest.submission_date).toLocaleString()}</span></div>
                  <div><span className="text-muted-foreground">Verified:</span> <Badge variant={selectedRequest.email_verified ? "default" : "secondary"}>{selectedRequest.email_verified ? "Yes" : "No"}</Badge></div>
                  {selectedRequest.verification_date && (
                    <div><span className="text-muted-foreground">Verified At:</span> <span className="font-medium">{new Date(selectedRequest.verification_date).toLocaleString()}</span></div>
                  )}
                  <div><span className="text-muted-foreground">IP:</span> <span className="font-medium text-xs">{selectedRequest.ip_address || "—"}</span></div>
                </div>

                {selectedRequest.notes && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Submission Notes:</span>
                    <p className="mt-1 bg-muted/50 rounded-lg p-3">{selectedRequest.notes}</p>
                  </div>
                )}

                {selectedRequest.user_agent && (
                  <div className="text-xs text-muted-foreground">
                    <span>Browser: </span>{selectedRequest.user_agent.slice(0, 120)}...
                  </div>
                )}

                <div className="border-t border-border pt-4 space-y-4">
                  <div className="space-y-1.5">
                    <Label>Status</Label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Admin Notes</Label>
                    <Textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Add notes about this lead..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setSelectedRequest(null)}>Cancel</Button>
                    <Button onClick={handleUpdateRequest} className="bg-primary text-primary-foreground">
                      <Save size={14} className="mr-1" /> Save Changes
                    </Button>
                  </div>
                </div>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
