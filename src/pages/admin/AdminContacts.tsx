import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Reply, CheckCircle, X } from 'lucide-react';
import { Contact } from '../../types';

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    // Load contacts from localStorage
    const storedContacts = JSON.parse(localStorage.getItem('jelai_contacts') || '[]');
    setContacts(storedContacts);
    setFilteredContacts(storedContacts);
  }, []);

  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact => 
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Yangi';
      case 'replied': return 'Javob berilgan';
      case 'closed': return 'Yopilgan';
      default: return status;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'product-inquiry': return 'bg-blue-100 text-blue-800';
      case 'order-status': return 'bg-yellow-100 text-yellow-800';
      case 'wholesale': return 'bg-purple-100 text-purple-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectText = (subject: string) => {
    switch (subject) {
      case 'product-inquiry': return 'Mahsulot haqida';
      case 'order-status': return 'Buyurtma holati';
      case 'wholesale': return 'Ulgurji xarid';
      case 'complaint': return 'Shikoyat';
      case 'suggestion': return 'Taklif';
      default: return 'Boshqa';
    }
  };

  const updateContactStatus = (contactId: string, newStatus: string) => {
    const updatedContacts = contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, status: newStatus as Contact['status'] }
        : contact
    );
    
    setContacts(updatedContacts);
    localStorage.setItem('jelai_contacts', JSON.stringify(updatedContacts));
    
    if (selectedContact && selectedContact.id === contactId) {
      setSelectedContact({ ...selectedContact, status: newStatus as Contact['status'] });
    }
  };

  const replyToContact = async () => {
    if (!selectedContact || !replyText.trim()) return;

    setIsReplying(true);
    
    // Simulate sending reply
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedContacts = contacts.map(contact => 
      contact.id === selectedContact.id 
        ? { 
            ...contact, 
            status: 'replied' as Contact['status'],
            reply: replyText,
            repliedAt: new Date().toISOString()
          }
        : contact
    );
    
    setContacts(updatedContacts);
    localStorage.setItem('jelai_contacts', JSON.stringify(updatedContacts));
    
    setSelectedContact({
      ...selectedContact,
      status: 'replied',
      reply: replyText,
      repliedAt: new Date().toISOString()
    });
    
    setReplyText('');
    setIsReplying(false);
    alert('Javob muvaffaqiyatli yuborildi!');
  };

  const viewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Murojaat</h1>
          <p className="text-gray-600 mt-2">Mijozlar murojaat va savollarini boshqaring</p>
        </div>
        <div className="text-sm text-gray-500">
          Jami: {filteredContacts.length} ta murojaat
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ism, email, mavzu yoki xabar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Barcha holatlar</option>
                <option value="new">Yangi</option>
                <option value="replied">Javob berilgan</option>
                <option value="closed">Yopilgan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mijoz
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mavzu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {contact.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSubjectColor(contact.subject)}`}>
                        {getSubjectText(contact.subject)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => viewContact(contact)}
                        className="text-green-600 hover:text-green-900 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ko'rish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Murojaat topilmadi
            </h3>
            <p className="text-gray-500">
              Qidiruv shartlaringizni o'zgartirib ko'ring
            </p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Murojaat tafsilotlari
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Murojaat holati</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedContact.status)}`}>
                    {getStatusText(selectedContact.status)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {selectedContact.status === 'new' && (
                    <button
                      onClick={() => updateContactStatus(selectedContact.id, 'replied')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Javob berildi deb belgilash</span>
                    </button>
                  )}
                  {selectedContact.status !== 'closed' && (
                    <button
                      onClick={() => updateContactStatus(selectedContact.id, 'closed')}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Yopish</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Mijoz ma'lumotlari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">To'liq ism</p>
                    <p className="font-medium">{selectedContact.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefon</p>
                    <p className="font-medium">{selectedContact.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sana</p>
                    <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Subject and Message */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Murojaat mazmuni</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Mavzu</p>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getSubjectColor(selectedContact.subject)}`}>
                      {getSubjectText(selectedContact.subject)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Xabar</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Reply */}
              {selectedContact.reply && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Berilgan javob</h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.reply}</p>
                    {selectedContact.repliedAt && (
                      <p className="text-sm text-gray-500 mt-2">
                        Javob berilgan: {formatDate(selectedContact.repliedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {selectedContact.status !== 'closed' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Javob berish</h3>
                  <div className="space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Javobingizni yozing..."
                    />
                    <button
                      onClick={replyToContact}
                      disabled={!replyText.trim() || isReplying}
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isReplying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Yuborilmoqda...</span>
                        </>
                      ) : (
                        <>
                          <Reply className="w-4 h-4" />
                          <span>Javob yuborish</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;