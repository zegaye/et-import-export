
/**
 * International Supplier Readiness Assessment
 *
 * 20 questions
 * 5 categories
 * 5 points per question
 * Maximum score: 100
 *
 * Important:
 * Correct answers must be validated on the server.
 * Do not use this client-side file as the grading authority.
 */

export const supplierAssessmentSections = [
  {
    id: 'company',
    title: 'Company Legitimacy and Registration'
  },
  {
    id: 'capacity',
    title: 'Manufacturing and Supply Capacity'
  },
  {
    id: 'quality',
    title: 'Product Quality and Certifications'
  },
  {
    id: 'logistics',
    title: 'International Shipping and Documentation'
  },
  {
    id: 'ethiopia',
    title: 'Ethiopian Market and Import Requirements'
  }
];

export const supplierAssessmentQuestions = [
  {
    id: 'q1',
    section: 'company',
    question: 'What best describes your company registration status?',
    options: [
      { value: 'A', label: 'We have no formal registration.' },
      { value: 'B', label: 'Registration is in progress.' },
      { value: 'C', label: 'We have an active business registration.' },
      { value: 'D', label: 'We operate informally through intermediaries.' }
    ]
  },
  {
    id: 'q2',
    section: 'company',
    question: 'Can your company provide evidence of its legal identity?',
    options: [
      { value: 'A', label: 'No documentation is available.' },
      { value: 'B', label: 'We can provide only informal references.' },
      { value: 'C', label: 'We can provide valid company registration documents.' },
      { value: 'D', label: 'We are not sure what documents are required.' }
    ]
  },
  {
    id: 'q3',
    section: 'company',
    question: 'How does your company handle commercial contracts?',
    options: [
      { value: 'A', label: 'We do not use written contracts.' },
      { value: 'B', label: 'We rely only on verbal agreements.' },
      { value: 'C', label: 'We use written contracts with clear commercial terms.' },
      { value: 'D', label: 'We leave contract preparation entirely to customers.' }
    ]
  },
  {
    id: 'q4',
    section: 'company',
    question: 'How does your company verify its business partners?',
    options: [
      { value: 'A', label: 'We do not verify partners.' },
      { value: 'B', label: 'We rely only on social media profiles.' },
      { value: 'C', label: 'We check registration, identity, and commercial references.' },
      { value: 'D', label: 'We assume all interested buyers are legitimate.' }
    ]
  },
  {
    id: 'q5',
    section: 'capacity',
    question: 'How do you confirm product availability before accepting an order?',
    options: [
      { value: 'A', label: 'We accept orders without checking stock.' },
      { value: 'B', label: 'We estimate availability from previous sales.' },
      { value: 'C', label: 'We verify inventory or production capacity.' },
      { value: 'D', label: 'We wait until payment before contacting suppliers.' }
    ]
  },
  {
    id: 'q6',
    section: 'capacity',
    question: 'How does your company manage large purchase orders?',
    options: [
      { value: 'A', label: 'We have no capacity planning process.' },
      { value: 'B', label: 'We accept any order regardless of capacity.' },
      { value: 'C', label: 'We plan production, inventory, staffing, and delivery.' },
      { value: 'D', label: 'We depend entirely on unexpected stock availability.' }
    ]
  },
  {
    id: 'q7',
    section: 'capacity',
    question: 'How do you respond when a supplier cannot meet an agreed delivery date?',
    options: [
      { value: 'A', label: 'We do not inform the customer.' },
      { value: 'B', label: 'We cancel without explanation.' },
      { value: 'C', label: 'We communicate promptly and propose corrective actions.' },
      { value: 'D', label: 'We wait until the customer complains.' }
    ]
  },
  {
    id: 'q8',
    section: 'capacity',
    question: 'What is the best way to demonstrate consistent supply capacity?',
    options: [
      { value: 'A', label: 'Make verbal promises only.' },
      { value: 'B', label: 'Advertise unlimited supply.' },
      { value: 'C', label: 'Provide production records, inventory evidence, and references.' },
      { value: 'D', label: 'Avoid disclosing delivery capabilities.' }
    ]
  },
  {
    id: 'q9',
    section: 'quality',
    question: 'How should product quality requirements be established?',
    options: [
      { value: 'A', label: 'By appearance alone.' },
      { value: 'B', label: 'By informal customer comments.' },
      { value: 'C', label: 'Through agreed specifications and applicable standards.' },
      { value: 'D', label: 'After the products have been shipped.' }
    ]
  },
  {
    id: 'q10',
    section: 'quality',
    question: 'What should a supplier do when a product requires certification?',
    options: [
      { value: 'A', label: 'Ignore the certification requirement.' },
      { value: 'B', label: 'Create an unofficial certificate.' },
      { value: 'C', label: 'Obtain valid certification from an appropriate recognized body.' },
      { value: 'D', label: 'Ask the buyer to accept uncertified products.' }
    ]
  },
  {
    id: 'q11',
    section: 'quality',
    question: 'What is the purpose of product traceability?',
    options: [
      { value: 'A', label: 'To conceal the source of products.' },
      { value: 'B', label: 'To eliminate product inspections.' },
      { value: 'C', label: 'To track products, batches, origins, and related records.' },
      { value: 'D', label: 'To avoid maintaining inventory records.' }
    ]
  },
  {
    id: 'q12',
    section: 'quality',
    question: 'How should a supplier handle a confirmed product defect?',
    options: [
      { value: 'A', label: 'Ignore the complaint.' },
      { value: 'B', label: 'Delete the related records.' },
      { value: 'C', label: 'Investigate, document, and implement corrective action.' },
      { value: 'D', label: 'Blame the shipping company automatically.' }
    ]
  },
  {
    id: 'q13',
    section: 'logistics',
    question: 'What does a commercial invoice normally document?',
    options: [
      { value: 'A', label: 'Only the shipping company address.' },
      { value: 'B', label: 'Only the buyer’s telephone number.' },
      { value: 'C', label: 'The transaction, goods, parties, quantities, and values.' },
      { value: 'D', label: 'Only the supplier’s advertising information.' }
    ]
  },
  {
    id: 'q14',
    section: 'logistics',
    question: 'What is the purpose of Incoterms in international trade?',
    options: [
      { value: 'A', label: 'To replace all commercial contracts.' },
      { value: 'B', label: 'To determine product quality automatically.' },
      { value: 'C', label: 'To clarify specified delivery obligations, costs, and risks.' },
      { value: 'D', label: 'To guarantee payment by the buyer.' }
    ]
  },
  {
    id: 'q15',
    section: 'logistics',
    question: 'Why is an accurate packing list important?',
    options: [
      { value: 'A', label: 'It replaces every customs document.' },
      { value: 'B', label: 'It guarantees customs clearance.' },
      { value: 'C', label: 'It identifies shipment packages, quantities, and contents.' },
      { value: 'D', label: 'It eliminates the need for shipping arrangements.' }
    ]
  },
  {
    id: 'q16',
    section: 'logistics',
    question: 'How should a supplier manage international shipment risks?',
    options: [
      { value: 'A', label: 'Ship without checking transport conditions.' },
      { value: 'B', label: 'Assume all risks belong to the buyer.' },
      { value: 'C', label: 'Agree delivery terms and assess packaging, insurance, and logistics.' },
      { value: 'D', label: 'Avoid documenting shipment arrangements.' }
    ]
  },
  {
    id: 'q17',
    section: 'ethiopia',
    question: 'Before supplying a product to Ethiopia, what should be checked?',
    options: [
      { value: 'A', label: 'Only the product’s advertising potential.' },
      { value: 'B', label: 'Only the supplier’s domestic market price.' },
      { value: 'C', label: 'Applicable import restrictions, standards, and documentation.' },
      { value: 'D', label: 'Only the color of the packaging.' }
    ]
  },
  {
    id: 'q18',
    section: 'ethiopia',
    question: 'Who should confirm the applicable Ethiopian import permits and requirements?',
    options: [
      { value: 'A', label: 'An unrelated social media user.' },
      { value: 'B', label: 'The shipping driver alone.' },
      { value: 'C', label: 'The importer and relevant competent authorities or authorized advisers.' },
      { value: 'D', label: 'Any supplier without checking official requirements.' }
    ]
  },
  {
    id: 'q19',
    section: 'ethiopia',
    question: 'How should an international supplier quote products for an Ethiopian buyer?',
    options: [
      { value: 'A', label: 'Provide a price without currency or terms.' },
      { value: 'B', label: 'Quote an estimated price without product specifications.' },
      { value: 'C', label: 'Specify currency, product details, quantity, delivery terms, and validity.' },
      { value: 'D', label: 'Avoid written quotations.' }
    ]
  },
  {
    id: 'q20',
    section: 'ethiopia',
    question: 'What should a supplier do when Ethiopian import rules change?',
    options: [
      { value: 'A', label: 'Continue using outdated documentation.' },
      { value: 'B', label: 'Ignore changes until goods are rejected.' },
      { value: 'C', label: 'Verify updated requirements and adjust documentation and shipment plans.' },
      { value: 'D', label: 'Assume previous approvals apply to every future shipment.' }
    ]
  }
];

export const supplierAssessmentOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' }
];
