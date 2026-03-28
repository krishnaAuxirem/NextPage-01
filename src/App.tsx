import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import { UIProvider } from "@/contexts/UIContext";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { ProtectedRoute } from "@/components/features/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import Discover from "./pages/Discover";
import Categories from "./pages/Categories";
import LearningPaths from "./pages/LearningPaths";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Search from "./pages/Search";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ContentDetail from "./pages/ContentDetail";
import Settings from "./pages/dashboard/Settings";
import MyReading from "./pages/dashboard/MyReading";
import Bookmarks from "./pages/dashboard/Bookmarks";
import Learning from "./pages/dashboard/Learning";
import MyContent from "./pages/dashboard/MyContent";
import CreateContent from "./pages/dashboard/CreateContent";
import Analytics from "./pages/dashboard/Analytics";
import ReadingAnalytics from "./pages/dashboard/ReadingAnalytics";
import Collections from "./pages/dashboard/Collections";
import Following from "./pages/dashboard/Following";
import Earnings from "./pages/dashboard/Earnings";
import Users from "./pages/dashboard/Users";
import ContentManagement from "./pages/dashboard/ContentManagement";
import Moderation from "./pages/dashboard/Moderation";
import AdminAnalytics from "./pages/dashboard/AdminAnalytics";
import AuthorProfile from './pages/AuthorProfile';
import ReadingClubs from './pages/ReadingClubs';

const queryClient = new QueryClient();

// Layout wrapper for dashboard pages
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex">
    <DashboardSidebar />
    <main className="flex-1 p-8 bg-background min-h-screen">{children}</main>
  </div>
);

// Layout wrapper for main pages
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ContentProvider>
          <UIProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public Routes with Main Layout */}
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                <Route path="/discover" element={<MainLayout><Discover /></MainLayout>} />
                <Route path="/categories" element={<MainLayout><Categories /></MainLayout>} />
                <Route path="/learning-paths" element={<MainLayout><LearningPaths /></MainLayout>} />
                <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
                <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
                <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
                <Route path="/subscription" element={<MainLayout><Subscription /></MainLayout>} />
                <Route path="/content/:id" element={<MainLayout><ContentDetail /></MainLayout>} />
                <Route path="/author/:id" element={<MainLayout><AuthorProfile /></MainLayout>} />
                <Route path="/reading-clubs" element={<MainLayout><ReadingClubs /></MainLayout>} />

                {/* Auth Routes (No Layout) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes with Navbar but no Footer */}
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <Search />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <Profile />
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <Notifications />
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <DashboardOverview />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Reader Dashboard Routes */}
                <Route
                  path="/dashboard/reading"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <MyReading />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/bookmarks"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Bookmarks />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/learning"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Learning />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/following"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Following />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/collections"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Collections />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/analytics"
                  element={
                    <ProtectedRoute allowedRoles={['reader']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <ReadingAnalytics />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Author Dashboard Routes */}
                <Route
                  path="/dashboard/my-content"
                  element={
                    <ProtectedRoute allowedRoles={['author']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <MyContent />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/create"
                  element={
                    <ProtectedRoute allowedRoles={['author']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <CreateContent />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Earnings Route for Author */}
                <Route
                  path="/dashboard/earnings"
                  element={
                    <ProtectedRoute allowedRoles={['author']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Earnings />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Dashboard Routes */}
                <Route
                  path="/dashboard/users"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Users />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/content-management"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <ContentManagement />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/moderation"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Moderation />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/admin-analytics"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <AdminAnalytics />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Settings - Available to all authenticated users */}
                <Route
                  path="/dashboard/settings"
                  element={
                    <ProtectedRoute>
                      <>
                        <Navbar />
                        <DashboardLayout>
                          <Settings />
                        </DashboardLayout>
                      </>
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </UIProvider>
        </ContentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
