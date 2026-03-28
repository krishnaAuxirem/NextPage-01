import { Card } from '@/components/ui/card';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using NextPage, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.',
    },
    {
      title: '2. User Accounts',
      content: 'You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate information and keep it updated.',
    },
    {
      title: '3. Content Guidelines',
      content: 'Users must not publish content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable. We reserve the right to remove any content that violates these guidelines.',
    },
    {
      title: '4. Intellectual Property',
      content: 'Content creators retain ownership of their original work. By publishing on NextPage, you grant us a license to display, distribute, and promote your content on our platform. You must have the rights to all content you publish.',
    },
    {
      title: '5. Monetization and Payments',
      content: 'Authors can monetize their content through our platform. We charge a service fee on transactions. Payment terms, payout schedules, and revenue sharing are detailed in our Creator Agreement.',
    },
    {
      title: '6. Prohibited Activities',
      content: 'Users must not engage in spamming, scraping, unauthorized access, transmission of malware, impersonation, or any activity that disrupts or interferes with the platform\'s operation.',
    },
    {
      title: '7. Termination',
      content: 'We reserve the right to suspend or terminate accounts that violate these terms. Users may close their accounts at any time. Upon termination, certain provisions of these terms continue to apply.',
    },
    {
      title: '8. Disclaimers and Limitations',
      content: 'NextPage is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform. Our liability is limited to the maximum extent permitted by law.',
    },
    {
      title: '9. Indemnification',
      content: 'You agree to indemnify and hold NextPage harmless from any claims, damages, or expenses arising from your use of the platform, your content, or your violation of these terms.',
    },
    {
      title: '10. Changes to Terms',
      content: 'We may modify these terms at any time. We will notify users of significant changes. Your continued use of the platform after changes constitutes acceptance of the modified terms.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Last updated: March 28, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            These Terms of Service govern your use of NextPage and the services we provide. By using our platform,
            you agree to comply with these terms and all applicable laws and regulations.
          </p>
        </Card>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 mt-8 bg-primary/5">
          <h3 className="text-xl font-semibold mb-4">Questions About These Terms?</h3>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms of Service, please contact our legal team:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Email: legal@nextpage.com</li>
            <li>Address: 123 Knowledge Ave, San Francisco, CA 94102</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
