import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { customerAPI } from '../services/adminAPI';
import { ROUTES } from '../constants/endpoints';
import '../styles/DepartmentDetail.css';

const DepartmentDetailPage = () => {
  const { dept }  = useParams();
  const navigate  = useNavigate();
  const deptName  = decodeURIComponent(dept);

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await customerAPI.getAll();
        const all = res.data.data.customers;
        setInquiries(all.filter((c) => c.department === deptName));
      } catch {
        setError('Failed to load inquiries.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deptName]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="page-container">
      <div className="dept-detail-header">
        <button className="btn-back" onClick={() => navigate(ROUTES.ADMIN_DEPARTMENT)}>
          <MdArrowBack /> Back
        </button>
        <div>
          <h2 className="page-title">{deptName}</h2>
          <p className="page-subtitle">
            {loading ? '...' : `${inquiries.length} inquiry${inquiries.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {loading && <p className="dept-inq-loading">Loading inquiries...</p>}
      {error   && <p className="dept-inq-error">{error}</p>}

      {!loading && !error && inquiries.length === 0 && (
        <div className="empty-state"><p>No inquiries found for {deptName}.</p></div>
      )}

      {!loading && inquiries.length > 0 && (
        <div className="dept-inq-list">
          {inquiries.map((inq) => (
            <div key={inq._id} className="dept-inq-card">

              <div className="inq-card-section">
                <div className="inq-card-section-title">Contact Details</div>
                <div className="inq-card-grid">
                  <div className="inq-card-field">
                    <span className="inq-field-label">Company</span>
                    <span className="inq-field-value">{inq.company || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Name</span>
                    <span className="inq-field-value">{inq.name}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Phone</span>
                    <span className="inq-field-value">{inq.phone || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Email</span>
                    <span className="inq-field-value">{inq.email || '—'}</span>
                  </div>
                  <div className="inq-card-field inq-card-field--full">
                    <span className="inq-field-label">Address</span>
                    <span className="inq-field-value">{inq.address || '—'}</span>
                  </div>
                </div>
              </div>

              <div className="inq-card-section">
                <div className="inq-card-section-title">Equipment Details</div>
                <div className="inq-card-grid">
                  <div className="inq-card-field">
                    <span className="inq-field-label">Equipment Name</span>
                    <span className="inq-field-value">{inq.equipmentName || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Make</span>
                    <span className="inq-field-value">{inq.make || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Model No</span>
                    <span className="inq-field-value">{inq.modelNo || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Liquid</span>
                    <span className="inq-field-value">{inq.liquid || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Temperature</span>
                    <span className="inq-field-value">{inq.temperature || '—'}</span>
                  </div>
                  <div className="inq-card-field">
                    <span className="inq-field-label">Pressure</span>
                    <span className="inq-field-value">{inq.pressure || '—'}</span>
                  </div>
                  {inq.description && (
                    <div className="inq-card-field inq-card-field--full">
                      <span className="inq-field-label">Description</span>
                      <span className="inq-field-value">{inq.description}</span>
                    </div>
                  )}
                  {inq.attachment && (
                    <div className="inq-card-field inq-card-field--full">
                      <span className="inq-field-label">Attachment</span>
                      <a
                        className="inq-attachment-link"
                        href={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${inq.attachment}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View File
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="inq-card-footer">
                Submitted on {formatDate(inq.createdAt)}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentDetailPage;
