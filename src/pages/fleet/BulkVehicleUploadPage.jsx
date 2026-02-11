import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

const BulkVehicleUploadPage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Download CSV template
  const handleDownloadTemplate = () => {
    const headers = ['registrationNumber', 'vinNumber', 'chassisNumber', 'make', 'model', 'year', 'color', 'truckType', 'loadCapacity', 'ownershipType'];
    const sampleRow = ['ABC-123-XY', 'WDB9634221L123456', 'CH123456789', 'Mercedes-Benz', 'Actros', '2020', 'White', 'Flatbed', '30', 'Owned'];

    const csvContent = [
      headers.join(','),
      sampleRow.join(',')
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'vehicle_bulk_upload_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess('Template downloaded successfully');
  };

  // Handle CSV/Excel file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      showError('Please upload a valid CSV or Excel file');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Simulate file parsing (replace with actual CSV/Excel parsing library like PapaParse)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock parsed data
      const mockData = [
        {
          id: 1,
          registrationNumber: 'ABC-123-XY',
          make: 'Mercedes-Benz',
          model: 'Actros',
          year: 2020,
          color: 'White',
          truckType: 'Flatbed',
          loadCapacity: 30,
          vinNumber: 'WDB9634221L123456',
          chassisNumber: 'CH123456789',
          ownershipType: 'Owned',
          documents: {
            vehicleLicense: null,
            roadworthinessCert: null,
            insuranceCert: null,
          }
        },
        {
          id: 2,
          registrationNumber: 'XYZ-456-AB',
          make: 'Volvo',
          model: 'FH16',
          year: 2019,
          color: 'Blue',
          truckType: 'Skeletal',
          loadCapacity: 35,
          vinNumber: 'YV2A2A18LAB123456',
          chassisNumber: 'CH987654321',
          ownershipType: 'Leased',
          documents: {
            vehicleLicense: null,
            roadworthinessCert: null,
            insuranceCert: null,
          }
        },
        {
          id: 3,
          registrationNumber: 'DEF-789-CD',
          make: 'MAN',
          model: 'TGX',
          year: 2021,
          color: 'Red',
          truckType: 'Tanker',
          loadCapacity: 25,
          vinNumber: 'WMA01XXX1LX123456',
          chassisNumber: 'CH456789123',
          ownershipType: 'Financed',
          documents: {
            vehicleLicense: null,
            roadworthinessCert: null,
            insuranceCert: null,
          }
        },
      ];

      setParsedData(mockData);
      showSuccess(`Successfully parsed ${mockData.length} vehicle records`);
    } catch (error) {
      showError('Failed to parse file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle document upload for specific row
  const handleDocumentUpload = async (rowId, docType, file) => {
    if (!file) return;

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      setParsedData(prev => prev.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            documents: {
              ...row.documents,
              [docType]: {
                name: file.name,
                size: file.size,
                url: URL.createObjectURL(file)
              }
            }
          };
        }
        return row;
      }));

      showSuccess(`${file.name} uploaded successfully`);
    } catch (error) {
      showError(`Failed to upload ${file.name}`);
    }
  };

  // Remove document from row
  const handleRemoveDocument = (rowId, docType) => {
    setParsedData(prev => prev.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          documents: {
            ...row.documents,
            [docType]: null
          }
        };
      }
      return row;
    }));
  };

  // Validate all rows have required documents
  const validateData = () => {
    const errors = [];
    parsedData.forEach((row, index) => {
      if (!row.documents.vehicleLicense) {
        errors.push(`Row ${index + 1} (${row.registrationNumber}): Missing vehicle license`);
      }
      if (!row.documents.roadworthinessCert) {
        errors.push(`Row ${index + 1} (${row.registrationNumber}): Missing roadworthiness certificate`);
      }
      if (!row.documents.insuranceCert) {
        errors.push(`Row ${index + 1} (${row.registrationNumber}): Missing insurance certificate`);
      }
    });
    return errors;
  };

  // Submit bulk data
  const handleSubmit = async () => {
    const errors = validateData();
    if (errors.length > 0) {
      showError(`Please upload required documents:\n${errors.join('\n')}`);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      showSuccess(`Successfully created ${parsedData.length} vehicles`);
      setTimeout(() => navigate('/fleet/vehicles'), 1500);
    } catch (error) {
      showError('Failed to create vehicles. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDocumentUpload = (row, docType, label, required = false) => {
    const doc = row.documents[docType];

    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {doc ? (
          <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-green-900 flex-1 truncate">{doc.name}</span>
            <button
              type="button"
              onClick={() => handleRemoveDocument(row.id, docType)}
              className="text-red-600 hover:text-red-800 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              id={`${docType}-${row.id}`}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleDocumentUpload(row.id, docType, e.target.files?.[0])}
              className="hidden"
            />
            <label
              htmlFor={`${docType}-${row.id}`}
              className="flex items-center justify-center px-3 py-2 border border-dashed border-gray-300 rounded cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all"
            >
              <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-xs text-gray-600">Upload</span>
            </label>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/fleet/vehicles')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Vehicles
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Bulk Vehicle Upload</h1>
        <p className="text-sm text-gray-600 mt-1">Upload multiple vehicles at once using a CSV or Excel file</p>
      </div>

      {/* File Upload Section */}
      {!parsedData.length && (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Upload Vehicle Data File</h3>
              <p className="mt-2 text-sm text-gray-600">Upload a CSV or Excel file containing vehicle information</p>
            </div>

            <div className="mb-6">
              <input
                type="file"
                id="bulk-upload"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileUpload}
                disabled={isProcessing}
                className="hidden"
              />
              <label
                htmlFor="bulk-upload"
                className="flex flex-col items-center justify-center w-full px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-10 w-10 text-secondary mb-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm font-medium text-gray-900">Processing file...</p>
                  </>
                ) : (
                  <>
                    <svg className="h-10 w-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-900">Click to upload CSV or Excel file</p>
                    <p className="text-xs text-gray-500 mt-1">CSV, XLS, XLSX up to 10MB</p>
                  </>
                )}
              </label>
            </div>

            {/* Template Download */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-semibold text-blue-900">Required Columns</h4>
                  <p className="text-xs text-blue-800 mt-1">
                    registrationNumber, vinNumber, chassisNumber, make, model, year, color, truckType, loadCapacity, ownershipType
                  </p>
                  <button
                    onClick={handleDownloadTemplate}
                    className="mt-2 text-sm text-blue-700 hover:text-blue-900 font-medium cursor-pointer"
                  >
                    Download Template CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Review Section */}
      {parsedData.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Review & Attach Documents</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {parsedData.length} vehicles found. Please attach required documents to each vehicle.
                </p>
              </div>
              <button
                onClick={() => {
                  setParsedData([]);
                  setUploadedFile(null);
                }}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Upload Different File
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specifications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ownership</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ minWidth: '300px' }}>
                    Documents
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parsedData.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{row.registrationNumber}</div>
                      <div className="text-xs text-gray-500">
                        {row.year} {row.make} {row.model}
                      </div>
                      <div className="text-xs text-gray-500">{row.color}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{row.truckType}</div>
                      <div className="text-xs text-gray-500">{row.loadCapacity}T Capacity</div>
                      <div className="text-xs text-gray-500">VIN: {row.vinNumber.substring(0, 12)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{row.ownershipType}</div>
                    </td>
                    <td className="px-6 py-4">
                      {renderDocumentUpload(row, 'vehicleLicense', 'Vehicle License', true)}
                      {renderDocumentUpload(row, 'roadworthinessCert', 'Roadworthiness Cert', true)}
                      {renderDocumentUpload(row, 'insuranceCert', 'Insurance Cert', true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Total: <span className="font-semibold text-gray-900">{parsedData.length}</span> vehicles ready to be created
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/fleet/vehicles')}
                  disabled={isSubmitting}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 font-medium transition-colors shadow-lg shadow-secondary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Vehicles...' : `Create ${parsedData.length} Vehicles`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkVehicleUploadPage;
