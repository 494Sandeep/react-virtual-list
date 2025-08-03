import { Employee } from "../@type/employee";

// Sample data arrays for realistic generation
const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa',
  'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Linda', 'Charles',
  'Patricia', 'Joseph', 'Elizabeth', 'Thomas', 'Barbara', 'Christopher',
  'Susan', 'Daniel', 'Jessica', 'Matthew', 'Karen', 'Anthony', 'Nancy',
  'Mark', 'Betty', 'Donald', 'Helen', 'Steven', 'Sandra', 'Paul', 'Donna',
  'Andrew', 'Carol', 'Joshua', 'Ruth', 'Kenneth', 'Sharon', 'Kevin', 'Michelle',
  'Brian', 'Laura', 'George', 'Sarah', 'Edward', 'Kimberly', 'Ronald', 'Deborah',
  'Timothy', 'Dorothy', 'Jason', 'Lisa', 'Jeffrey', 'Nancy', 'Ryan', 'Karen'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green',
  'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz'
];

const designations = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'Project Manager',
  'UI/UX Designer',
  'Quality Assurance Engineer',
  'Business Analyst',
  'System Administrator',
  'Database Administrator',
  'Technical Lead',
  'Engineering Manager',
  'Architect',
  'Senior Architect',
  'Principal Engineer',
  'Staff Engineer',
  'Director of Engineering',
  'VP of Engineering',
  'CTO',
  'Intern',
  'Junior Developer',
  'Associate Engineer',
  'Senior Manager',
  'Team Lead',
  'Scrum Master'
];

const domains = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com',
  'tech.com', 'business.org', 'enterprise.net', 'corp.com', 'inc.com'
];

/**
 * Generates a random integer between min and max (inclusive)
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random element from an array
 */
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random email based on name
 */
function generateEmail(firstName: string, lastName: string): string {
  const domain = getRandomElement(domains);
  const variations = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}${getRandomInt(1, 999)}@${domain}`,
    `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}_${lastName.toLowerCase()}@${domain}`
  ];
  return getRandomElement(variations);
}

/**
 * Generates salary based on designation and experience
 */
function generateSalary(designation: string, experience: number): number {
  const baseSalaries: { [key: string]: number } = {
    'Intern': 30000,
    'Junior Developer': 45000,
    'Associate Engineer': 55000,
    'Software Engineer': 70000,
    'Frontend Developer': 75000,
    'Backend Developer': 80000,
    'Full Stack Developer': 85000,
    'Senior Software Engineer': 95000,
    'Lead Software Engineer': 120000,
    'Quality Assurance Engineer': 65000,
    'DevOps Engineer': 90000,
    'Data Scientist': 100000,
    'UI/UX Designer': 70000,
    'Business Analyst': 65000,
    'System Administrator': 60000,
    'Database Administrator': 75000,
    'Technical Lead': 130000,
    'Product Manager': 110000,
    'Project Manager': 85000,
    'Scrum Master': 80000,
    'Engineering Manager': 140000,
    'Architect': 150000,
    'Senior Architect': 170000,
    'Principal Engineer': 180000,
    'Staff Engineer': 160000,
    'Senior Manager': 150000,
    'Team Lead': 100000,
    'Director of Engineering': 200000,
    'VP of Engineering': 250000,
    'CTO': 300000
  };

  const baseSalary = baseSalaries[designation] || 70000;
  const experienceMultiplier = 1 + (experience * 0.05); // 5% increase per year of experience
  const randomVariation = 0.8 + Math.random() * 0.4; // ±20% variation
  
  return Math.round(baseSalary * experienceMultiplier * randomVariation);
}

/**
 * Generates experience based on designation
 */
function generateExperience(designation: string): number {
  const experienceRanges: { [key: string]: [number, number] } = {
    'Intern': [0, 1],
    'Junior Developer': [0, 2],
    'Associate Engineer': [1, 3],
    'Software Engineer': [2, 5],
    'Frontend Developer': [2, 6],
    'Backend Developer': [2, 6],
    'Full Stack Developer': [3, 7],
    'Senior Software Engineer': [5, 10],
    'Lead Software Engineer': [7, 12],
    'Quality Assurance Engineer': [2, 8],
    'DevOps Engineer': [3, 8],
    'Data Scientist': [3, 8],
    'UI/UX Designer': [2, 7],
    'Business Analyst': [2, 8],
    'System Administrator': [2, 10],
    'Database Administrator': [3, 10],
    'Technical Lead': [6, 12],
    'Product Manager': [5, 12],
    'Project Manager': [4, 12],
    'Scrum Master': [3, 10],
    'Engineering Manager': [8, 15],
    'Architect': [8, 15],
    'Senior Architect': [10, 18],
    'Principal Engineer': [10, 20],
    'Staff Engineer': [8, 15],
    'Senior Manager': [8, 15],
    'Team Lead': [5, 12],
    'Director of Engineering': [12, 20],
    'VP of Engineering': [15, 25],
    'CTO': [15, 30]
  };

  const [min, max] = experienceRanges[designation] || [2, 8];
  return getRandomInt(min, max);
}

/**
 * Generates a single employee record
 */
function generateEmployee(id: number): Employee {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const email = generateEmail(firstName, lastName);
  const designation = getRandomElement(designations);
  const experience = generateExperience(designation);
  const salary = generateSalary(designation, experience);

  return {
    id,
    name,
    email,
    designation,
    salary,
    experience,
  };
}

/**
 * Generates an array of employee records
 * @param count - Number of records to generate
 * @returns Array of Employee objects
 */
export function generateEmployeeData(count: number): Employee[] {
  const employees: Employee[] = [];
  
  for (let i = 1; i <= count; i++) {
    employees.push(generateEmployee(i));
  }
  
  return employees;
}

/**
 * Generates a large dataset for performance testing
 * @param count - Number of records to generate (default: 10000)
 * @returns Array of Employee objects
 */
export function generateLargeDataset(count: number = 10000): Employee[] {
  console.log(`Generating ${count} employee records...`);
  const startTime = performance.now();
  
  const data = generateEmployeeData(count);
  
  const endTime = performance.now();
  console.log(`Generated ${count} records in ${(endTime - startTime).toFixed(2)}ms`);
  
  return data;
}

/**
 * Utility function to get sample data for development/testing
 */
export function getSampleData(): Employee[] {
  return generateEmployeeData(50);
}

export default {
  generateEmployeeData,
  generateLargeDataset,
  getSampleData
};
