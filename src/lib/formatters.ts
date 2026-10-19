/**
 * Indian Number & Currency Formatting Utilities
 * Handles Lakhs (₹1,00,000) and Crores (₹1,00,00,000) formatting
 */

export function formatINR(value: number): string {
  if (isNaN(value)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatLakhs(value: number): string {
  if (isNaN(value)) return "₹0";
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  const lakh = value / 100000;
  return `₹${lakh.toFixed(2)} Lakh`;
}

export function formatKM(value: number): string {
  if (isNaN(value)) return "0 km";
  return `${new Intl.NumberFormat("en-IN").format(value)} km`;
}

export interface EMICalculationResult {
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
  interestPercentage: number;
  principalPercentage: number;
}

/**
 * Calculates monthly EMI using the standard reducing balance loan formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number
): EMICalculationResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return {
      monthlyEMI: 0,
      totalInterest: 0,
      totalPayment: 0,
      principal: 0,
      interestPercentage: 0,
      principalPercentage: 100,
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  
  if (monthlyRate === 0) {
    const monthlyEMI = Math.round(principal / tenureMonths);
    return {
      monthlyEMI,
      totalInterest: 0,
      totalPayment: principal,
      principal,
      interestPercentage: 0,
      principalPercentage: 100,
    };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEMI = Math.round((principal * monthlyRate * factor) / (factor - 1));
  const totalPayment = monthlyEMI * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  const total = totalPayment || 1;
  const principalPercentage = Math.round((principal / total) * 100);
  const interestPercentage = 100 - principalPercentage;

  return {
    monthlyEMI,
    totalInterest,
    totalPayment,
    principal,
    interestPercentage,
    principalPercentage,
  };
}

/**
 * Creates pre-filled WhatsApp click-to-chat URL
 */
export function createWhatsAppLeadLink(
  whatsappNumber: string,
  message: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
