'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    email: '',
    grantType: 'education',
    organizationName: '',
    projectTitle: '',
    requestedAmount: '',
    purpose: '',
    qualifications: '',
    communityImpact: '',
    timeline: '',
  });

  const [generatedLetter, setGeneratedLetter] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateLetter = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const grantTypeText = {
      education: 'educational advancement',
      business: 'business development',
      personal: 'personal development',
      community: 'community enhancement',
      nonprofit: 'nonprofit organization support'
    }[formData.grantType] || 'program support';

    const letter = `${formData.fullName}
${formData.address}
${formData.city}, GA ${formData.zipCode}
${formData.phone}
${formData.email}

${today}

${formData.organizationName || '[Grant Organization Name]'}
[Organization Address]
[City], GA [ZIP Code]

Dear Grant Review Committee,

RE: Application for ${formData.projectTitle || 'Grant Program'}

I am writing to submit my formal application for grant funding through your esteemed organization. As a resident of Georgia, I am deeply committed to contributing to the growth and prosperity of our community, and I believe this grant opportunity aligns perfectly with my goals and qualifications.

PROJECT OVERVIEW

I am seeking funding in the amount of $${formData.requestedAmount || '[Amount]'} for ${grantTypeText}. ${formData.purpose || 'This initiative will serve as a catalyst for positive change and sustainable growth in our community.'}

QUALIFICATIONS AND BACKGROUND

${formData.qualifications || 'I bring a strong foundation of experience, dedication, and proven capability to successfully execute this project. My background demonstrates a consistent track record of commitment to excellence and community service.'}

COMMUNITY IMPACT AND SIGNIFICANCE

${formData.communityImpact || 'This project will create meaningful, lasting impact in our Georgia community. The benefits will extend beyond immediate outcomes, fostering long-term growth and opportunities for residents. I am committed to transparent reporting and accountability throughout the project lifecycle.'}

The proposed initiative addresses critical needs in our community while aligning with Georgia's economic development priorities. By investing in this project, your organization will be supporting sustainable growth that benefits not just one individual, but creates a ripple effect of positive change throughout the region.

IMPLEMENTATION TIMELINE

${formData.timeline || 'I have developed a comprehensive timeline to ensure efficient and effective use of grant funds. All milestones will be documented and reported according to your organization\'s requirements. I am prepared to begin implementation immediately upon grant approval and maintain regular communication with your team throughout the project duration.'}

FINANCIAL STEWARDSHIP

I understand the responsibility that comes with receiving grant funding and am committed to exemplary financial stewardship. All funds will be utilized strictly for their intended purposes, with detailed documentation maintained for transparency and accountability. I will provide comprehensive reports as required and am prepared to undergo any necessary audits or reviews.

SUSTAINABILITY AND LONG-TERM VISION

This project is designed with sustainability in mind. Beyond the initial grant period, I have developed strategies to ensure continued success and growth. The foundation built through this grant will enable ongoing positive impact and may serve as a model for similar initiatives throughout Georgia.

CONCLUSION

I am deeply grateful for your consideration of this application. Your organization's commitment to supporting Georgia residents is commendable, and I am honored to be considered for this opportunity. I am confident that with your support, this project will achieve meaningful results that reflect positively on both your organization's mission and the broader Georgia community.

I am available at your convenience to discuss this application in greater detail, provide additional documentation, or answer any questions you may have. Thank you for your time, consideration, and continued dedication to empowering Georgia residents.

I look forward to the opportunity to partner with your organization in creating lasting positive change.

With sincere appreciation and respect,


${formData.fullName}

Enclosures:
- Supporting Documentation
- Project Budget Breakdown
- Letters of Recommendation
- Proof of Georgia Residency
- Tax Documentation (if applicable)

---

Note: This letter should be printed on professional letterhead and accompanied by all required supporting documentation as specified in the grant application guidelines.`;

    setGeneratedLetter(letter);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `grant-letter-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const printLetter = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Grant Application Letter</title>');
      printWindow.document.write('<style>body{font-family:Georgia,serif;line-height:1.8;padding:40px;white-space:pre-wrap;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(generatedLetter);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="container">
      {showSuccess && (
        <div className="success-message">
          ✓ Letter copied to clipboard!
        </div>
      )}

      <header className="header">
        <h1>Georgia Grant Letter Generator</h1>
        <p>Create professional, compelling grant application letters that stand out</p>
      </header>

      <div className="main-content">
        <div className="card form-section">
          <h2>Your Information</h2>

          <div className="info-box">
            Fill in your details below to generate a professional grant application letter tailored to Georgia organizations.
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              required
            />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Atlanta"
              required
            />
          </div>

          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="30301"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(404) 555-0123"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Grant Type *</label>
            <select
              name="grantType"
              value={formData.grantType}
              onChange={handleInputChange}
              required
            >
              <option value="education">Education/School</option>
              <option value="business">Business Start-up</option>
              <option value="personal">Personal Development</option>
              <option value="community">Community Project</option>
              <option value="nonprofit">Nonprofit Organization</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grant Organization Name</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              placeholder="Georgia Department of Community Affairs"
            />
          </div>

          <div className="form-group">
            <label>Project/Program Title *</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
              placeholder="Small Business Development Initiative"
              required
            />
          </div>

          <div className="form-group">
            <label>Requested Amount *</label>
            <input
              type="text"
              name="requestedAmount"
              value={formData.requestedAmount}
              onChange={handleInputChange}
              placeholder="25,000"
              required
            />
          </div>

          <div className="form-group">
            <label>Project Purpose/Goals *</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              placeholder="Describe what you plan to accomplish with this grant funding..."
              required
            />
          </div>

          <div className="form-group">
            <label>Your Qualifications *</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="Describe your background, experience, education, and why you're qualified..."
              required
            />
          </div>

          <div className="form-group">
            <label>Community Impact *</label>
            <textarea
              name="communityImpact"
              value={formData.communityImpact}
              onChange={handleInputChange}
              placeholder="Explain how this project will benefit your community and create lasting change..."
              required
            />
          </div>

          <div className="form-group">
            <label>Implementation Timeline</label>
            <textarea
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              placeholder="Outline your project timeline and key milestones..."
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={generateLetter}>
              Generate Letter
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFormData({
                  fullName: '',
                  address: '',
                  city: '',
                  zipCode: '',
                  phone: '',
                  email: '',
                  grantType: 'education',
                  organizationName: '',
                  projectTitle: '',
                  requestedAmount: '',
                  purpose: '',
                  qualifications: '',
                  communityImpact: '',
                  timeline: '',
                });
                setGeneratedLetter('');
              }}
            >
              Clear Form
            </button>
          </div>
        </div>

        <div className="card letter-preview">
          <h2>Generated Letter</h2>
          <div className={`letter-content ${!generatedLetter ? 'empty' : ''}`}>
            {generatedLetter || 'Your professional grant letter will appear here after you fill out the form and click "Generate Letter"'}
          </div>
          {generatedLetter && (
            <div className="action-buttons">
              <button className="btn-action btn-copy" onClick={copyToClipboard}>
                📋 Copy
              </button>
              <button className="btn-action btn-download" onClick={downloadLetter}>
                💾 Download
              </button>
              <button className="btn-action btn-print" onClick={printLetter}>
                🖨️ Print
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tips">
        <h3>Tips for Grant Application Success</h3>
        <ul>
          <li>Be specific and detailed about your project goals and how you'll achieve them</li>
          <li>Demonstrate clear community benefit and alignment with Georgia's priorities</li>
          <li>Provide concrete numbers and measurable outcomes whenever possible</li>
          <li>Show your commitment through detailed planning and realistic timelines</li>
          <li>Emphasize sustainability and how the project will continue beyond the grant period</li>
          <li>Include all required supporting documentation with your application</li>
          <li>Proofread carefully and ensure all information is accurate and professional</li>
          <li>Submit your application well before the deadline</li>
          <li>Follow up appropriately and be available for questions</li>
          <li>Customize the generated letter further to match specific grant requirements</li>
        </ul>
      </div>
    </div>
  );
}
