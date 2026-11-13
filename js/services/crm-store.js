const CRM_STORAGE_KEY = 'spirits_global_crm_v1';

function saveClientRecord(client) {
  const existingRecords = readStoredJSON(CRM_STORAGE_KEY, []);
  existingRecords.unshift(client);
  return writeStoredJSON(CRM_STORAGE_KEY, existingRecords);
}
