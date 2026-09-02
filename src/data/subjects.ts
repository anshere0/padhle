import type { Subject, ExamRelevance } from '../types';

// Helper to create default topic
function t(id: string, subjectId: string, title: string, relevance: ExamRelevance) {
  return {
    id,
    subjectId,
    title,
    status: 'NOT_STARTED' as const,
    confidence: 0,
    examRelevance: relevance,
    questionsAttempted: 0,
    questionsCorrect: 0,
    notes: '',
    revision1: false,
    revision2: false,
    revision3: false,
    revision1Date: null,
    revision2Date: null,
    revision3Date: null,
  };
}

const r = (gate: number, cuet: number, gatb: number): ExamRelevance => ({ gate, cuet, gatb });

export const defaultSubjects: Subject[] = [
  // 1. Molecular Biology
  {
    id: 'molecular-biology',
    name: 'Molecular Biology',
    icon: '🧬',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('mb-1', 'molecular-biology', 'DNA Structure & Properties', r(5, 5, 5)),
      t('mb-2', 'molecular-biology', 'DNA Replication', r(5, 5, 5)),
      t('mb-3', 'molecular-biology', 'DNA Polymerases', r(5, 4, 5)),
      t('mb-4', 'molecular-biology', 'Transcription in Prokaryotes', r(5, 5, 5)),
      t('mb-5', 'molecular-biology', 'Transcription in Eukaryotes', r(5, 5, 5)),
      t('mb-6', 'molecular-biology', 'RNA Processing & Splicing', r(5, 5, 5)),
      t('mb-7', 'molecular-biology', 'Translation & Protein Synthesis', r(5, 5, 5)),
      t('mb-8', 'molecular-biology', 'Gene Regulation — Prokaryotes', r(5, 5, 5)),
      t('mb-9', 'molecular-biology', 'Gene Regulation — Eukaryotes', r(5, 5, 5)),
      t('mb-10', 'molecular-biology', 'Operons (lac, trp, ara)', r(5, 5, 5)),
      t('mb-11', 'molecular-biology', 'DNA Repair Mechanisms', r(5, 5, 5)),
      t('mb-12', 'molecular-biology', 'Mutations & Mutagenesis', r(5, 5, 5)),
      t('mb-13', 'molecular-biology', 'Epigenetics', r(4, 4, 4)),
      t('mb-14', 'molecular-biology', 'Chromatin Structure & Organization', r(4, 5, 4)),
      t('mb-15', 'molecular-biology', 'Non-coding RNA', r(4, 4, 4)),
      t('mb-16', 'molecular-biology', 'RNA Interference', r(4, 4, 4)),
    ],
  },

  // 2. Genetics
  {
    id: 'genetics',
    name: 'Genetics',
    icon: '🔬',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('gen-1', 'genetics', 'Mendelian Genetics', r(5, 5, 5)),
      t('gen-2', 'genetics', 'Probability in Genetics', r(5, 4, 4)),
      t('gen-3', 'genetics', 'Linkage & Recombination', r(5, 5, 5)),
      t('gen-4', 'genetics', 'Crossing Over & Gene Mapping', r(5, 5, 5)),
      t('gen-5', 'genetics', 'Chromosomal Aberrations', r(4, 5, 4)),
      t('gen-6', 'genetics', 'Extrachromosomal Inheritance', r(4, 4, 4)),
      t('gen-7', 'genetics', 'Microbial Genetics', r(4, 4, 4)),
      t('gen-8', 'genetics', 'Population Genetics', r(5, 5, 5)),
      t('gen-9', 'genetics', 'Quantitative Genetics', r(4, 3, 3)),
      t('gen-10', 'genetics', 'Human Genetics & Genetic Disorders', r(3, 4, 4)),
      t('gen-11', 'genetics', 'Sex-linked Inheritance', r(4, 4, 4)),
      t('gen-12', 'genetics', 'Epistasis & Gene Interaction', r(4, 4, 4)),
    ],
  },

  // 3. Cell Biology
  {
    id: 'cell-biology',
    name: 'Cell Biology',
    icon: '🔭',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('cb-1', 'cell-biology', 'Cell Membrane Structure & Transport', r(5, 5, 5)),
      t('cb-2', 'cell-biology', 'Organelles — Mitochondria & Chloroplasts', r(5, 5, 5)),
      t('cb-3', 'cell-biology', 'Organelles — ER, Golgi, Lysosomes', r(5, 5, 5)),
      t('cb-4', 'cell-biology', 'Cytoskeleton', r(4, 4, 4)),
      t('cb-5', 'cell-biology', 'Cell Cycle & Its Regulation', r(5, 5, 5)),
      t('cb-6', 'cell-biology', 'Mitosis & Meiosis', r(5, 5, 5)),
      t('cb-7', 'cell-biology', 'Cell Signalling Pathways', r(5, 5, 5)),
      t('cb-8', 'cell-biology', 'Apoptosis & Programmed Cell Death', r(5, 5, 5)),
      t('cb-9', 'cell-biology', 'Protein Trafficking & Sorting', r(4, 4, 4)),
      t('cb-10', 'cell-biology', 'Extracellular Matrix', r(3, 4, 3)),
      t('cb-11', 'cell-biology', 'Cancer Biology', r(4, 5, 4)),
    ],
  },

  // 4. Biochemistry
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    icon: '⚗️',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('bio-1', 'biochemistry', 'Amino Acids & Protein Structure', r(5, 5, 5)),
      t('bio-2', 'biochemistry', 'Enzyme Kinetics', r(5, 5, 5)),
      t('bio-3', 'biochemistry', 'Enzyme Inhibition & Regulation', r(5, 5, 5)),
      t('bio-4', 'biochemistry', 'Carbohydrates', r(4, 5, 4)),
      t('bio-5', 'biochemistry', 'Lipids & Membranes', r(4, 5, 5)),
      t('bio-6', 'biochemistry', 'Nucleic Acid Biochemistry', r(5, 5, 5)),
      t('bio-7', 'biochemistry', 'Vitamins & Coenzymes', r(3, 5, 4)),
      t('bio-8', 'biochemistry', 'Thermodynamics & Bioenergetics', r(5, 4, 4)),
      t('bio-9', 'biochemistry', 'Glycolysis', r(5, 5, 5)),
      t('bio-10', 'biochemistry', 'TCA Cycle', r(5, 5, 5)),
      t('bio-11', 'biochemistry', 'Electron Transport Chain & Oxidative Phosphorylation', r(5, 5, 5)),
      t('bio-12', 'biochemistry', 'ATP Synthesis', r(5, 5, 5)),
      t('bio-13', 'biochemistry', 'Fatty Acid Oxidation & Synthesis', r(4, 5, 4)),
      t('bio-14', 'biochemistry', 'Amino Acid Metabolism', r(4, 4, 4)),
      t('bio-15', 'biochemistry', 'Gluconeogenesis & Pentose Phosphate Pathway', r(4, 4, 4)),
    ],
  },

  // 5. Microbiology
  {
    id: 'microbiology',
    name: 'Microbiology',
    icon: '🦠',
    priority: 'CRITICAL',
    examRelevance: r(4, 5, 5),
    notes: '',
    topics: [
      t('mic-1', 'microbiology', 'Microbial Diversity & Classification', r(4, 5, 5)),
      t('mic-2', 'microbiology', 'Bacterial Structure & Morphology', r(4, 5, 5)),
      t('mic-3', 'microbiology', 'Bacterial Growth & Reproduction', r(5, 5, 5)),
      t('mic-4', 'microbiology', 'Microbial Metabolism', r(4, 4, 4)),
      t('mic-5', 'microbiology', 'Microbial Genetics', r(4, 5, 4)),
      t('mic-6', 'microbiology', 'Antibiotics & Antimicrobial Agents', r(3, 5, 5)),
      t('mic-7', 'microbiology', 'Viruses — Plant & Animal', r(4, 5, 5)),
      t('mic-8', 'microbiology', 'Industrial Microbiology', r(4, 5, 4)),
      t('mic-9', 'microbiology', 'Agricultural Microbiology', r(3, 5, 4)),
      t('mic-10', 'microbiology', 'Environmental Microbiology', r(3, 5, 4)),
      t('mic-11', 'microbiology', 'Food Microbiology', r(3, 4, 3)),
    ],
  },

  // 6. Immunology
  {
    id: 'immunology',
    name: 'Immunology',
    icon: '🛡️',
    priority: 'HIGH',
    examRelevance: r(4, 5, 5),
    notes: '',
    topics: [
      t('imm-1', 'immunology', 'Innate Immunity', r(4, 5, 5)),
      t('imm-2', 'immunology', 'Adaptive Immunity', r(4, 5, 5)),
      t('imm-3', 'immunology', 'Antigens & Antibodies', r(5, 5, 5)),
      t('imm-4', 'immunology', 'B Cells & T Cells', r(4, 5, 5)),
      t('imm-5', 'immunology', 'MHC & Antigen Presentation', r(4, 5, 5)),
      t('imm-6', 'immunology', 'Complement System', r(4, 5, 5)),
      t('imm-7', 'immunology', 'Cytokines', r(3, 4, 4)),
      t('imm-8', 'immunology', 'Vaccines & Immunization', r(4, 5, 5)),
      t('imm-9', 'immunology', 'Hypersensitivity', r(3, 4, 4)),
      t('imm-10', 'immunology', 'Autoimmunity & Immunodeficiency', r(3, 4, 4)),
    ],
  },

  // 7. Recombinant DNA / Genetic Engineering
  {
    id: 'rdt',
    name: 'Recombinant DNA / Genetic Engineering',
    icon: '✂️',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('rdt-1', 'rdt', 'Restriction Enzymes & DNA Modifying Enzymes', r(5, 5, 5)),
      t('rdt-2', 'rdt', 'Cloning Vectors', r(5, 5, 5)),
      t('rdt-3', 'rdt', 'Gene Cloning Strategies', r(5, 5, 5)),
      t('rdt-4', 'rdt', 'Gene Libraries — Genomic & cDNA', r(5, 5, 5)),
      t('rdt-5', 'rdt', 'Expression Systems', r(5, 4, 5)),
      t('rdt-6', 'rdt', 'PCR, qPCR, RT-PCR', r(5, 5, 5)),
      t('rdt-7', 'rdt', 'DNA Sequencing — Sanger & NGS', r(5, 4, 5)),
      t('rdt-8', 'rdt', 'CRISPR-Cas9 & Genome Editing', r(5, 4, 5)),
      t('rdt-9', 'rdt', 'Transgenics & Gene Therapy', r(4, 4, 4)),
      t('rdt-10', 'rdt', 'Site-Directed Mutagenesis', r(4, 3, 4)),
      t('rdt-11', 'rdt', 'Reporter Genes & Selection Markers', r(4, 4, 4)),
    ],
  },

  // 8. Biotechnology Techniques
  {
    id: 'techniques',
    name: 'Biotechnology Techniques',
    icon: '🔧',
    priority: 'CRITICAL',
    examRelevance: r(5, 5, 5),
    notes: '',
    topics: [
      t('tech-1', 'techniques', 'Chromatography (HPLC, GC, Affinity, Ion Exchange)', r(5, 5, 5)),
      t('tech-2', 'techniques', 'Spectroscopy (UV-Vis, IR, NMR, Mass Spec)', r(5, 5, 5)),
      t('tech-3', 'techniques', 'Microscopy (Light, Fluorescence, Electron)', r(4, 5, 5)),
      t('tech-4', 'techniques', 'Electrophoresis (SDS-PAGE, Agarose, 2D-GE)', r(5, 5, 5)),
      t('tech-5', 'techniques', 'Centrifugation Techniques', r(4, 5, 5)),
      t('tech-6', 'techniques', 'Blotting (Southern, Northern, Western)', r(5, 5, 5)),
      t('tech-7', 'techniques', 'ELISA & Immunoassays', r(5, 5, 5)),
      t('tech-8', 'techniques', 'Flow Cytometry & Cell Sorting', r(4, 3, 4)),
      t('tech-9', 'techniques', 'Radioisotope Techniques', r(3, 5, 3)),
      t('tech-10', 'techniques', 'X-ray Crystallography & Structural Biology', r(3, 3, 3)),
    ],
  },

  // 9. Plant Biology
  {
    id: 'plant-biology',
    name: 'Plant Biology',
    icon: '🌿',
    priority: 'HIGH',
    examRelevance: r(3, 5, 4),
    notes: '',
    topics: [
      t('pb-1', 'plant-biology', 'Bryophytes', r(2, 5, 3)),
      t('pb-2', 'plant-biology', 'Pteridophytes', r(2, 5, 3)),
      t('pb-3', 'plant-biology', 'Gymnosperms', r(2, 5, 3)),
      t('pb-4', 'plant-biology', 'Angiosperms', r(2, 5, 3)),
      t('pb-5', 'plant-biology', 'Plant Anatomy & Vascular Systems', r(2, 5, 3)),
      t('pb-6', 'plant-biology', 'Photosynthesis', r(4, 5, 5)),
      t('pb-7', 'plant-biology', 'Photoperiodism & Vernalization', r(3, 5, 4)),
      t('pb-8', 'plant-biology', 'Plant Hormones', r(3, 5, 4)),
      t('pb-9', 'plant-biology', 'Biogeochemical Cycles', r(3, 5, 4)),
      t('pb-10', 'plant-biology', 'Economic Importance of Plants', r(2, 5, 3)),
    ],
  },

  // 10. Animal Biology
  {
    id: 'animal-biology',
    name: 'Animal Biology',
    icon: '🐾',
    priority: 'HIGH',
    examRelevance: r(3, 5, 4),
    notes: '',
    topics: [
      t('ab-1', 'animal-biology', 'Invertebrate Diversity', r(2, 5, 3)),
      t('ab-2', 'animal-biology', 'Vertebrate Diversity', r(2, 5, 3)),
      t('ab-3', 'animal-biology', 'Human Anatomy & Physiology', r(3, 5, 4)),
      t('ab-4', 'animal-biology', 'Nerve Impulse & Neurobiology', r(3, 5, 4)),
      t('ab-5', 'animal-biology', 'Endocrinology', r(3, 5, 4)),
      t('ab-6', 'animal-biology', 'Human Diseases', r(3, 5, 4)),
      t('ab-7', 'animal-biology', 'Developmental Biology', r(3, 4, 4)),
      t('ab-8', 'animal-biology', 'Inherited Diseases', r(3, 5, 4)),
    ],
  },

  // 11. Plant Biotechnology
  {
    id: 'plant-biotech',
    name: 'Plant Biotechnology',
    icon: '🌱',
    priority: 'HIGH',
    examRelevance: r(4, 4, 4),
    notes: '',
    topics: [
      t('pbt-1', 'plant-biotech', 'Plant Tissue Culture', r(5, 5, 5)),
      t('pbt-2', 'plant-biotech', 'Plant Cell Culture Techniques', r(4, 5, 4)),
      t('pbt-3', 'plant-biotech', 'Somatic Hybridization', r(4, 4, 4)),
      t('pbt-4', 'plant-biotech', 'Transgenic Plants', r(5, 4, 4)),
      t('pbt-5', 'plant-biotech', 'Bt Crops & Herbicide Resistance', r(4, 4, 4)),
      t('pbt-6', 'plant-biotech', 'Marker-Assisted Selection', r(4, 3, 3)),
      t('pbt-7', 'plant-biotech', 'Plant Genomics', r(3, 3, 3)),
    ],
  },

  // 12. Animal Biotechnology
  {
    id: 'animal-biotech',
    name: 'Animal Biotechnology',
    icon: '🐁',
    priority: 'HIGH',
    examRelevance: r(4, 5, 4),
    notes: '',
    topics: [
      t('abt-1', 'animal-biotech', 'Animal Cell Culture', r(5, 5, 5)),
      t('abt-2', 'animal-biotech', 'Hybridoma & Monoclonal Antibodies', r(5, 5, 5)),
      t('abt-3', 'animal-biotech', 'Transgenic Animals', r(4, 4, 4)),
      t('abt-4', 'animal-biotech', 'Cloning & Nuclear Transfer', r(4, 4, 4)),
      t('abt-5', 'animal-biotech', 'Stem Cells', r(4, 4, 4)),
      t('abt-6', 'animal-biotech', 'Gene Therapy', r(4, 4, 4)),
    ],
  },

  // 13. Bioinformatics
  {
    id: 'bioinformatics',
    name: 'Bioinformatics',
    icon: '💻',
    priority: 'HIGH',
    examRelevance: r(4, 3, 3),
    notes: '',
    topics: [
      t('binf-1', 'bioinformatics', 'Biological Databases (NCBI, UniProt, PDB)', r(4, 3, 3)),
      t('binf-2', 'bioinformatics', 'Sequence Alignment (BLAST, FASTA)', r(5, 3, 3)),
      t('binf-3', 'bioinformatics', 'Scoring Matrices (PAM, BLOSUM)', r(4, 3, 3)),
      t('binf-4', 'bioinformatics', 'Phylogenetics', r(4, 3, 3)),
      t('binf-5', 'bioinformatics', 'Genomics & Proteomics', r(4, 3, 3)),
      t('binf-6', 'bioinformatics', 'Transcriptomics & Metabolomics', r(4, 3, 3)),
      t('binf-7', 'bioinformatics', 'Systems Biology', r(3, 2, 2)),
    ],
  },

  // 14. Biological Engineering
  {
    id: 'biological-engineering',
    name: 'Biological Engineering',
    icon: '⚙️',
    priority: 'MEDIUM',
    examRelevance: r(5, 2, 3),
    notes: 'Primarily GATE-specific',
    topics: [
      t('be-1', 'biological-engineering', 'Fluid Mechanics Basics', r(4, 1, 1)),
      t('be-2', 'biological-engineering', 'Heat Transfer', r(4, 1, 1)),
      t('be-3', 'biological-engineering', 'Mass Transfer', r(5, 1, 2)),
      t('be-4', 'biological-engineering', 'Reaction Kinetics', r(5, 2, 2)),
      t('be-5', 'biological-engineering', 'Biosensors & Instrumentation', r(4, 2, 3)),
    ],
  },

  // 15. Bioprocess Engineering
  {
    id: 'bioprocess',
    name: 'Bioprocess Engineering',
    icon: '🏭',
    priority: 'MEDIUM',
    examRelevance: r(5, 2, 3),
    notes: 'Primarily GATE-specific',
    topics: [
      t('bp-1', 'bioprocess', 'Microbial Growth Kinetics (Monod)', r(5, 2, 3)),
      t('bp-2', 'bioprocess', 'Batch, Fed-batch, Continuous Culture', r(5, 2, 3)),
      t('bp-3', 'bioprocess', 'Bioreactor Design & Types', r(5, 2, 2)),
      t('bp-4', 'bioprocess', 'Oxygen Transfer & kLa', r(5, 1, 2)),
      t('bp-5', 'bioprocess', 'Sterilization Kinetics', r(5, 1, 2)),
      t('bp-6', 'bioprocess', 'Upstream Processing', r(5, 2, 3)),
      t('bp-7', 'bioprocess', 'Downstream Processing', r(5, 3, 3)),
      t('bp-8', 'bioprocess', 'Scale-up Principles', r(4, 1, 2)),
    ],
  },

  // 16. Engineering Mathematics
  {
    id: 'engineering-math',
    name: 'Engineering Mathematics',
    icon: '📐',
    priority: 'MEDIUM',
    examRelevance: r(5, 0, 0),
    notes: 'GATE-specific — 13 marks within the BT subject component',
    topics: [
      t('em-1', 'engineering-math', 'Matrices & Determinants', r(5, 0, 0)),
      t('em-2', 'engineering-math', 'Eigenvalues & Eigenvectors', r(5, 0, 0)),
      t('em-3', 'engineering-math', 'Calculus — Differentiation', r(5, 0, 0)),
      t('em-4', 'engineering-math', 'Calculus — Integration', r(5, 0, 0)),
      t('em-5', 'engineering-math', 'Differential Equations', r(5, 0, 0)),
      t('em-6', 'engineering-math', 'Probability & Statistics', r(5, 0, 0)),
      t('em-7', 'engineering-math', 'Linear Algebra', r(5, 0, 0)),
      t('em-8', 'engineering-math', 'Numerical Methods', r(4, 0, 0)),
      t('em-9', 'engineering-math', 'Vector Calculus', r(4, 0, 0)),
    ],
  },

  // 17. General Aptitude
  {
    id: 'general-aptitude',
    name: 'General Aptitude',
    icon: '🧠',
    priority: 'MEDIUM',
    examRelevance: r(5, 0, 0),
    notes: 'GATE-specific — 15 marks (10 questions)',
    topics: [
      t('ga-1', 'general-aptitude', 'Verbal Ability — Vocabulary', r(5, 0, 0)),
      t('ga-2', 'general-aptitude', 'Verbal Ability — Grammar', r(5, 0, 0)),
      t('ga-3', 'general-aptitude', 'Reading Comprehension', r(5, 0, 0)),
      t('ga-4', 'general-aptitude', 'Quantitative Aptitude', r(5, 0, 0)),
      t('ga-5', 'general-aptitude', 'Data Interpretation', r(5, 0, 0)),
      t('ga-6', 'general-aptitude', 'Logical Reasoning', r(5, 0, 0)),
      t('ga-7', 'general-aptitude', 'Analytical Ability', r(5, 0, 0)),
      t('ga-8', 'general-aptitude', 'Spatial Aptitude', r(3, 0, 0)),
    ],
  },
];
