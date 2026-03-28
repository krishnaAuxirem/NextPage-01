import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Crown, Zap, Star } from 'lucide-react';
import { toast } from 'sonner';

const Subscription = () => {
  const handleSubscribe = (planName: string) => {
    toast.success(`Subscribed to ${planName} plan!`);
  };

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for casual readers getting started',
      icon: Star,
      features: [
        'Access to free content library',
        'Basic reading features',
        'Community forum access',
        'Limited bookmarks (up to 20)',
        'Basic search functionality',
      ],
      cta: 'Current Plan',
      popular: false,
      disabled: false,
    },
    {
      name: 'Premium',
      price: '₹499',
      period: 'per month',
      description: 'For serious learners and knowledge seekers',
      icon: Crown,
      features: [
        'Unlimited premium content access',
        'Advanced reading tools (highlights, notes)',
        'Offline reading (download content)',
        'Priority support',
        'Early access to new features',
        'Ad-free experience',
        'Unlimited bookmarks',
        'Advanced search and filters',
        'Personalized recommendations',
        'Reading analytics and insights',
      ],
      cta: 'Start Free Trial',
      popular: true,
      disabled: false,
      trial: '14-day free trial',
    },
    {
      name: 'Creator',
      price: '₹999',
      period: 'per month',
      description: 'For authors and content creators',
      icon: Zap,
      features: [
        'Everything in Premium',
        'Publish unlimited content',
        'Advanced analytics dashboard',
        'Monetization tools',
        'Custom branding options',
        'Dedicated account manager',
        'API access for integrations',
        'Priority content review',
        'Featured author badge',
        'Creator community access',
        'Marketing and promotion tools',
      ],
      cta: 'Start Creating',
      popular: false,
      disabled: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
    },
    {
      question: 'What happens after the free trial?',
      answer: 'After your 14-day free trial, you\'ll be charged the monthly fee. You can cancel before the trial ends to avoid charges.',
    },
    {
      question: 'Can I switch plans?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl opacity-90">Unlock premium features and support independent creators</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map(plan => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative p-8 ${plan.popular ? 'border-primary border-2 shadow-xl' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <div className={`h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'gradient-primary' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-8 w-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.trial && (
                    <p className="text-sm text-primary font-semibold">{plan.trial}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? 'gradient-primary' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.disabled}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Comparison</h2>
          <Card className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Feature</th>
                  <th className="text-center p-4">Free</th>
                  <th className="text-center p-4">Premium</th>
                  <th className="text-center p-4">Creator</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">Premium Content Access</td>
                  <td className="text-center p-4">Limited</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-t bg-muted/30">
                  <td className="p-4">Offline Reading</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">Publish Content</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-t bg-muted/30">
                  <td className="p-4">Analytics Dashboard</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">Basic</td>
                  <td className="text-center p-4">Advanced</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">API Access</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
