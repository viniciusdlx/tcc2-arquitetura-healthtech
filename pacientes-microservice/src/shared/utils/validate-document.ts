type ValidateDocumentProps = {
  doc: string;
};

export function validateDocument({ doc }: ValidateDocumentProps): boolean {
  if (!doc) {
    return false;
  }

  doc = doc.trim();
  doc = doc.replace(/\D/g, '');

  if (doc.length === 11 || doc.length === 14) {
    return true;
  }

  console.log('doc.length -> ', doc.length);

  return false;
}
