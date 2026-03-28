import { Card } from '@/components/ui/card';

const Privacy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, publish content, or communicate with us. This includes your name, email address, profile information, and content you create or interact with on our platform.',
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to personalize your experience, to communicate with you, to ensure platform security, and to comply with legal obligations.',
    },
    {
      title: '3. Information Sharing',
      content: 'We do not sell your personal information. We may share your information with service providers who assist us in operating our platform, when required by law, or with your consent. Published content is publicly accessible according to your privacy settings.',
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure.',
    },
    {
      title: '5. Your Rights',
      content: 'You have the right to access, correct, or delete your personal information. You can manage your privacy settings, opt-out of certain data collection, and request data portability. Contact us to exercise these rights.',
    },
    {
      title: '6. Cookies and Tracking',
      content: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings.',
    },
    {
      title: '7. Children\'s Privacy',
      content: 'Our platform is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.',
    },
    {
      title: '8. Changes to This Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of significant changes by email or through a notice on our platform. Your continued use constitutes acceptance of the updated policy.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Last updated: March 28, 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8 mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At NextPage, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform. Please read this policy carefully.
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
          <h3 className="text-xl font-semibold mb-4">Contact Us About Privacy</h3>
          <p className="text-muted-foreground mb-4">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Email: privacy@nextpage.com</li>
            <li>Address: 123 Knowledge Ave, San Francisco, CA 94102</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
