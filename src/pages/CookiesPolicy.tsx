import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Cookie,
  Shield,
  Settings2,
  BarChart3,
  Megaphone,
  ChevronRight,
  CheckCircle2,
  Info,
  ExternalLink,
  Clock,
  RefreshCw,
} from 'lucide-react';

interface CookieCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  required: boolean;
  enabled: boolean;
  examples: string[];
  retention: string;
}

const CookiesPolicy = () => {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    analytics: true,
    marketing: false,
    personalization: true,
  });

  const cookieCategories: CookieCategory[] = [
    {
      id: 'essential',
      icon: Shield,
      title: 'Strictly Necessary',
      description:
        'These cookies are required for the platform to function and cannot be disabled. They enable core features like user authentication, session management, and security.',
      required: true,
      enabled: true,
      examples: ['Session token', 'CSRF protection', 'Login state', 'Security identifiers'],
      retention: 'Session / up to 30 days',
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Analytics & Performance',
      description:
        'Help us understand how visitors interact with NextPage by collecting anonymous usage data. This enables us to improve platform performance and user experience.',
      required: false,
      enabled: preferences.analytics,
      examples: ['Page views', 'Reading duration', 'Click patterns', 'Error tracking'],
      retention: 'Up to 13 months',
    },
    {
      id: 'personalization',
      icon: Settings2,
      title: 'Personalization',
      description:
        'Remember your reading preferences, theme settings, and content choices to deliver a tailored experience across all sessions on NextPage.',
      required: false,
      enabled: preferences.personalization,
      examples: ['Reading theme', 'Font preferences', 'Language setting', 'Content filters'],
      retention: 'Up to 12 months',
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Marketing & Advertising',
      description:
        'Used to deliver relevant promotional content and measure the effectiveness of our marketing campaigns. These cookies may be set by our trusted partners.',
      required: false,
      enabled: preferences.marketing,
      examples: ['Ad targeting', 'Campaign tracking', 'Retargeting pixels', 'Conversion tracking'],
      retention: 'Up to 24 months',
    },
  ];

  const toggleCategory = (id: string) => {
    setPreferences(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSavePreferences = () => {
    toast.success('Cookie preferences saved successfully!');
  };

  const handleAcceptAll = () => {
    setPreferences({ analytics: true, marketing: true, personalization: true });
    toast.success('All cookies accepted.');
  };

  const handleRejectOptional = () => {
    setPreferences({ analytics: false, marketing: false, personalization: false });
    toast.success('Optional cookies rejected. Only essential cookies are active.');
  };

  const sections = [
    {
      title: 'What Are Cookies?',
      content:
        'Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, to remember your preferences, and to provide information to website owners. Cookies do not contain personally identifiable information on their own.',
    },
    {
      title: 'How NextPage Uses Cookies',
      content:
        'NextPage uses cookies to authenticate users, maintain reading sessions, personalize your experience, and analyze platform usage. We are committed to using cookies responsibly and only to the extent necessary to deliver a great experience.',
    },
    {
      title: 'Third-Party Cookies',
      content:
        'Some cookies on NextPage are placed by third-party services such as analytics providers, embedded content platforms, and advertising networks. These third parties have their own privacy policies and NextPage does not control their cookie practices.',
    },
    {
      title: 'Managing Your Cookies',
      content:
        'You can manage cookie preferences at any time using the preference panel above. Additionally, most browsers allow you to control cookies through settings. Note that disabling certain cookies may affect platform functionality and your personalized experience.',
    },
    {
      title: 'Cookie Consent',
      content:
        'When you first visit NextPage, we request your consent for non-essential cookies. Your preferences are stored and respected across all subsequent visits. You may withdraw consent at any time by updating your preferences here.',
    },
    {
      title: 'Changes to This Policy',
      content:
        'We may update this Cookie Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. We will notify you of significant changes by posting the updated policy on this page with a revised "Last Updated" date.',
    },
  ];

  const cookieTable = [
    { name: 'np_session', type: 'Essential', purpose: 'Maintains user login session', duration: '30 days' },
    { name: 'np_csrf', type: 'Essential', purpose: 'Cross-site request forgery protection', duration: 'Session' },
    { name: 'np_theme', type: 'Personalization', purpose: 'Stores reading theme preference', duration: '12 months' },
    { name: 'np_reading_prefs', type: 'Personalization', purpose: 'Font size and reading settings', duration: '12 months' },
    { name: '_np_analytics', type: 'Analytics', purpose: 'Tracks anonymous usage statistics', duration: '13 months' },
    { name: '_np_perf', type: 'Analytics', purpose: 'Monitors page load performance', duration: '13 months' },
    { name: '_np_ad', type: 'Marketing', purpose: 'Personalized promotional content delivery', duration: '24 months' },
    { name: '_fbp', type: 'Marketing', purpose: 'Meta/Facebook advertising tracking', duration: '90 days' },
  ];

  const typeColors: Record<string, string> = {
    Essential: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Personalization: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Analytics: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Marketing: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="outline" className="text-sm">Legal</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            We believe in transparency. Learn exactly what cookies NextPage uses, why we use them,
            and how you can manage your preferences.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Last updated: March 28, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4" />
              Effective: April 1, 2026
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick Summary */}
        <Card className="p-6 mb-10 border-l-4 border-l-primary bg-primary/5">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Quick Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NextPage uses four types of cookies: <strong>Essential</strong> (always active for site operation),
                <strong> Analytics</strong> (to improve our platform), <strong>Personalization</strong> (to remember your preferences),
                and <strong>Marketing</strong> (for relevant promotions). You control everything except essential cookies.
              </p>
            </div>
          </div>
        </Card>

        {/* Cookie Preference Manager */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Manage Your Preferences</h2>
              <p className="text-muted-foreground text-sm">Toggle cookie categories to match your comfort level.</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRejectOptional}>
                Reject Optional
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {cookieCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.id} className={`p-6 transition-all ${!cat.required && cat.enabled ? 'border-primary/40' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{cat.title}</h3>
                          {cat.required && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Required
                            </Badge>
                          )}
                        </div>
                        <Switch
                          checked={cat.enabled}
                          disabled={cat.required}
                          onCheckedChange={() => !cat.required && toggleCategory(cat.id)}
                          className="flex-shrink-0"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{cat.description}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Retention: {cat.retention}
                        </span>
                        <span>Examples: {cat.examples.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Save + Mobile actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button onClick={handleSavePreferences} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Save My Preferences
            </Button>
            <Button variant="outline" onClick={handleRejectOptional} className="sm:hidden">
              Reject Optional
            </Button>
            <Button onClick={handleAcceptAll} className="sm:hidden">
              Accept All
            </Button>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Policy Details</h2>
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Cookie Reference Table</h2>
          <p className="text-muted-foreground text-sm mb-6">
            A detailed list of all cookies currently used on NextPage.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold">Cookie Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Purpose</th>
                  <th className="text-left px-4 py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cookieTable.map((row) => (
                  <tr key={row.name} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[row.type]}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Browser Instructions */}
        <Card className="p-6 mb-12 bg-muted/40">
          <h2 className="text-xl font-bold mb-4">Managing Cookies in Your Browser</h2>
          <p className="text-sm text-muted-foreground mb-4">
            You can also control cookies directly through your browser settings. Here are guides for popular browsers:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
              { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox' },
              { name: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
              { name: 'Microsoft Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge' },
              { name: 'Opera', url: 'https://help.opera.com/en/latest/web-preferences/#cookies' },
              { name: 'Brave', url: 'https://support.brave.com/hc/en-us/articles/360022806212' },
            ].map((browser) => (
              <a
                key={browser.name}
                href={browser.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium group"
              >
                {browser.name}
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </Card>

        {/* Contact & Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Questions About Cookies?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about our use of cookies or this policy, our team is happy to help.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="sm" className="gap-2">
                Contact Us
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Related Policies</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn more about how we handle your data and what rights you have.
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="text-sm text-primary hover:underline flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary hover:underline flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                Terms of Service
              </Link>
            </div>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          © 2026 NextPage · This Cookie Policy is governed by the laws applicable in your jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
