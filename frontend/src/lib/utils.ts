export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateSEOTitle = (title: string, siteName = 'E-commerce Store'): string => {
  return `${title} | ${siteName}`;
};

export const generateSEODescription = (description: string, maxLength = 160): string => {
  return truncateText(description, maxLength);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const calculateCartTotal = (items: Array<{
  price: number;
  quantity: number;
}>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (items: Array<{
  quantity: number;
}>): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};
