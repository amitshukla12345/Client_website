import React, { useState, useContext, useEffect } from 'react';
import { FaSave, FaImage, FaTrash, FaPlus, FaMinus, FaChevronDown, FaEye, FaEyeSlash, FaCrop, FaArrowUp, FaArrowDown, FaDesktop, FaMobileAlt, FaTabletAlt, FaUndo, FaUser, FaMapMarkerAlt, FaOm, FaQuoteLeft, FaUsers, FaHome, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../../../context/AppContext';
import SmartImageCropper from './SmartImageCropper';

export default function AdminYajmanManager() {
  const { getAuthHeaders, handleResponse, yajman, setYajman } = useContext(AppContext);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [isKathaNameDropdownOpen, setIsKathaNameDropdownOpen] = useState(false);
  const [isBlessingDropdownOpen, setIsBlessingDropdownOpen] = useState(false);
  
  const days = ["प्रथम दिवस", "द्वितीय दिवस", "तृतीय दिवस", "चतुर्थ दिवस", "पंचम दिवस", "षष्ठम दिवस", "सप्तम दिवस"];
  const kathaNamesList = ["श्रीमद् भागवत कथा", "श्री राम कथा", "श्री शिव महापुराण कथा", "श्री देवी भागवत कथा", "श्री हनुमान कथा", "श्री भक्तमाल कथा", "श्री नानी बाई को मायरो", "श्री गौ कथा"];
  const blessingMessagesList = [
    "समस्त यजमान परिवार पर ठाकुर जी की कृपा सदैव बनी रहे। जय श्री कृष्ण!",
    "व्यास पीठ से यजमान परिवार को असीम आशीर्वाद।",
    "कथा श्रवण से आपके जीवन में सुख, शांति और समृद्धि का वास हो।",
    "परमात्मा आपको हमेशा सत्कर्म करने की प्रेरणा देते रहें।",
    "आपके इस पुनीत कार्य से समाज में धर्म और भक्ति का संचार हो।"
  ];

  const defaultYajmanData = {
    yajmanName: '',
    wifeName: '',
    currentAddress: '',
    nativePlace: '',
    kathaDay: '',
    kathaDate: '',
    kathaTime: '',
    kathaName: '',
    blessingMessage: '',
    originalImageUrl: '',
    profileImageUrl: '',
    cropData: '',
    isPublished: true,
    familyMembers: []
  };

  const [yajmanData, setYajmanData] = useState(defaultYajmanData);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modals state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  
  const [cropModalConfig, setCropModalConfig] = useState({
    isOpen: false,
    target: null, // 'main' or member index
    imageUrl: '',
    initialCropData: '',
    aspectRatio: '4/5'
  });

  // Warn before leaving if unsaved
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (yajman) {
      setYajmanData({
        yajmanName: yajman.yajmanName || '',
        wifeName: yajman.wifeName || '',
        currentAddress: yajman.currentAddress || '',
        nativePlace: yajman.nativePlace || '',
        kathaDay: yajman.kathaDay || '',
        kathaDate: yajman.kathaDate || '',
        kathaTime: yajman.kathaTime || '',
        kathaName: yajman.kathaName || '',
        blessingMessage: yajman.blessingMessage || '',
        originalImageUrl: yajman.originalImageUrl || '',
        profileImageUrl: yajman.profileImageUrl || '',
        cropData: yajman.cropData || '',
        isPublished: yajman.isPublished !== undefined ? yajman.isPublished : (yajman.published !== undefined ? yajman.published : true),
        familyMembers: (yajman.familyMembers || []).sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      });
      setHasUnsavedChanges(false);
    }
  }, [yajman]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setYajmanData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setHasUnsavedChanges(true);
  };

  // Image Upload Logic (Original saved, then open cropper)
  const handleImageUpload = (e, target = 'main', memberIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Increased to 2MB for original
        alert("Image is too large. Please choose an image under 2MB.");
        e.target.value = ''; 
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        
        if (target === 'main') {
          setYajmanData(prev => ({ ...prev, originalImageUrl: result, profileImageUrl: result }));
          setCropModalConfig({
            isOpen: true, target: 'main', imageUrl: result, initialCropData: yajmanData.cropData, aspectRatio: '4/5'
          });
        } else {
          handleFamilyMemberChange(memberIndex, 'originalImageUrl', result);
          handleFamilyMemberChange(memberIndex, 'imageUrl', result); // fallback
          setCropModalConfig({
            isOpen: true, target: memberIndex, imageUrl: result, initialCropData: yajmanData.familyMembers[memberIndex].cropData, aspectRatio: '1/1'
          });
        }
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCrop = (cropDataStr) => {
    if (cropModalConfig.target === 'main') {
      setYajmanData(prev => ({ ...prev, cropData: cropDataStr }));
    } else {
      handleFamilyMemberChange(cropModalConfig.target, 'cropData', cropDataStr);
    }
    setCropModalConfig({ isOpen: false, target: null, imageUrl: '', initialCropData: '' });
    setHasUnsavedChanges(true);
  };

  const openCropper = (target, memberIndex = null) => {
    if (target === 'main' && (yajmanData.originalImageUrl || yajmanData.profileImageUrl)) {
      setCropModalConfig({
        isOpen: true, target: 'main', imageUrl: yajmanData.originalImageUrl || yajmanData.profileImageUrl, initialCropData: yajmanData.cropData, aspectRatio: '4/5'
      });
    } else if (memberIndex !== null && (yajmanData.familyMembers[memberIndex].originalImageUrl || yajmanData.familyMembers[memberIndex].imageUrl)) {
      setCropModalConfig({
        isOpen: true, target: memberIndex, imageUrl: yajmanData.familyMembers[memberIndex].originalImageUrl, initialCropData: yajmanData.familyMembers[memberIndex].cropData, aspectRatio: '1/1'
      });
    }
  };

  const handleRemoveImage = (target, memberIndex = null) => {
    if (target === 'main') {
      setYajmanData(prev => ({ ...prev, profileImageUrl: '', originalImageUrl: '', cropData: '' }));
    } else {
      handleFamilyMemberChange(memberIndex, 'imageUrl', '');
      handleFamilyMemberChange(memberIndex, 'originalImageUrl', '');
      handleFamilyMemberChange(memberIndex, 'cropData', '');
    }
    setHasUnsavedChanges(true);
  };

  // Family Members Management
  const handleAddFamilyMember = () => {
    setYajmanData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { 
        name: '', relation: '', imageUrl: '', originalImageUrl: '', cropData: '', displayOrder: prev.familyMembers.length, isVisible: true 
      }]
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemoveFamilyMember = (index) => {
    if(window.confirm("Remove this family member?")) {
      setYajmanData(prev => ({
        ...prev,
        familyMembers: prev.familyMembers.filter((_, i) => i !== index)
      }));
      setHasUnsavedChanges(true);
    }
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setYajmanData(prev => {
      const newMembers = [...prev.familyMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, familyMembers: newMembers };
    });
    setHasUnsavedChanges(true);
  };

  const moveMember = (index, direction) => {
    setYajmanData(prev => {
      const newMembers = [...prev.familyMembers];
      if (direction === 'up' && index > 0) {
        [newMembers[index - 1], newMembers[index]] = [newMembers[index], newMembers[index - 1]];
      } else if (direction === 'down' && index < newMembers.length - 1) {
        [newMembers[index + 1], newMembers[index]] = [newMembers[index], newMembers[index + 1]];
      }
      // Reassign displayOrder
      newMembers.forEach((m, i) => m.displayOrder = i);
      return { ...prev, familyMembers: newMembers };
    });
    setHasUnsavedChanges(true);
  };

  // Validation
  const validateForm = () => {
    if (!yajmanData.yajmanName.trim()) { alert("Yajman Name is required."); return false; }
    if (!yajmanData.kathaName.trim()) { alert("Katha Name is required."); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/yajman', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(yajmanData)
      });
      const res = await handleResponse(response);
      if (res.ok) {
        const savedData = await res.json();
        setYajman(savedData);
        setHasUnsavedChanges(false);
        alert('Yajman details saved successfully!');
      } else {
        alert('Failed to save Yajman details.');
      }
    } catch (error) {
      console.error('Error saving yajman details:', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetForm = () => {
    if(hasUnsavedChanges && !window.confirm("You have unsaved changes. Discard them?")) return;
    
    if (yajman) {
      setYajmanData({
        yajmanName: yajman.yajmanName || '',
        wifeName: yajman.wifeName || '',
        currentAddress: yajman.currentAddress || '',
        nativePlace: yajman.nativePlace || '',
        kathaDay: yajman.kathaDay || '',
        kathaDate: yajman.kathaDate || '',
        kathaTime: yajman.kathaTime || '',
        kathaName: yajman.kathaName || '',
        blessingMessage: yajman.blessingMessage || '',
        originalImageUrl: yajman.originalImageUrl || '',
        profileImageUrl: yajman.profileImageUrl || '',
        cropData: yajman.cropData || '',
        isPublished: yajman.isPublished !== undefined ? yajman.isPublished : (yajman.published !== undefined ? yajman.published : true),
        familyMembers: (yajman.familyMembers || []).sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      });
    } else {
      setYajmanData(defaultYajmanData);
    }
    setHasUnsavedChanges(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Delete Yajman information?\n\nThis action will remove the current Yajman information from the website.")) {
      try {
        const response = await fetch('http://localhost:8080/api/admin/yajman', {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        if (response.ok) {
          setYajman(null);
          setYajmanData(defaultYajmanData);
          setHasUnsavedChanges(false);
          alert("Data deleted successfully!");
        } else {
          alert("Failed to delete.");
        }
      } catch (error) {
        console.error('Error deleting yajman:', error);
        alert("An error occurred.");
      }
    }
  };

  const renderCropStyle = (cropDataStr, zoomFactor = 1) => {
    if(!cropDataStr) return {};
    try {
      const data = JSON.parse(cropDataStr);
      return {
        objectPosition: `${data.posX}% ${data.posY}%`,
        transform: `scale(${data.zoom * zoomFactor})`
      };
    } catch (e) {
      return {};
    }
  };

  // PREVIEW RENDERER
  const renderPreview = () => (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">
       <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex items-center gap-4">
             <h3 className="font-bold text-[#3D2B20]">Preview Mode</h3>
             <div className="flex bg-gray-100 rounded-lg p-1">
                <button onClick={() => setPreviewDevice('desktop')} className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 ${previewDevice === 'desktop' ? 'bg-white shadow text-[#E05A10]' : 'text-gray-500 hover:text-gray-700'}`}><FaDesktop/> Desktop</button>
                <button onClick={() => setPreviewDevice('tablet')} className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 ${previewDevice === 'tablet' ? 'bg-white shadow text-[#E05A10]' : 'text-gray-500 hover:text-gray-700'}`}><FaTabletAlt/> Tablet</button>
                <button onClick={() => setPreviewDevice('mobile')} className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-2 ${previewDevice === 'mobile' ? 'bg-white shadow text-[#E05A10]' : 'text-gray-500 hover:text-gray-700'}`}><FaMobileAlt/> Mobile</button>
             </div>
          </div>
          <button onClick={() => setIsPreviewOpen(false)} className="px-4 py-2 bg-[#3D2B20] text-white rounded-lg font-bold text-sm hover:bg-[#2A1E17]">Close Preview</button>
       </div>
       
       <div className="flex-1 overflow-y-auto flex items-start justify-center p-4 sm:p-8">
          <div className={`bg-[#FCF9F2] shadow-xl border border-[#EAD8C8] overflow-hidden transition-all duration-300 ${
            previewDevice === 'desktop' ? 'w-full max-w-[1200px]' :
            previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
          }`}>
             {/* SIMULATED FRONTEND YAJMAN SECTION */}
             <div className="py-16 px-4 sm:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black font-serif text-[#3D2B20] mb-3">श्रद्धालु यजमान परिचय</h2>
                  <p className="text-[#E05A10] font-bold text-lg md:text-xl">कथा आयोजन एवं यजमान परिवार</p>
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E05A10] to-transparent mx-auto mt-4 rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  <div className="w-full md:w-[45%] flex justify-center">
                    <div className="relative p-2 bg-white rounded-3xl shadow-xl w-full max-w-sm aspect-[4/5] overflow-hidden">
                      {yajmanData.originalImageUrl ? (
                        <img 
                          src={yajmanData.originalImageUrl} 
                          className="w-full h-full object-cover rounded-2xl" 
                          style={renderCropStyle(yajmanData.cropData)}
                          alt="Yajman" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-[55%] space-y-8">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-[#8A2900] uppercase mb-1">
                        {yajmanData.yajmanName}
                      </h3>
                      {yajmanData.wifeName && (
                        <p className="text-xl md:text-2xl text-[#3D2B20] font-bold">
                          संग <span className="text-[#E05A10]">{yajmanData.wifeName}</span>
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {yajmanData.nativePlace && (
                        <div className="bg-white p-4 rounded-xl border border-[#EAD8C8] shadow-sm">
                          <p className="text-[10px] uppercase tracking-wider text-[#A44200] font-bold mb-1">मूल निवास</p>
                          <p className="text-[#3D2B20] font-semibold">{yajmanData.nativePlace}</p>
                        </div>
                      )}
                      {yajmanData.currentAddress && (
                        <div className="bg-white p-4 rounded-xl border border-[#EAD8C8] shadow-sm">
                          <p className="text-[10px] uppercase tracking-wider text-[#A44200] font-bold mb-1">वर्तमान निवास</p>
                          <p className="text-[#3D2B20] font-semibold">{yajmanData.currentAddress}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-2xl border-l-4 border-[#E05A10] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <FaEye className="text-6xl" />
                      </div>
                      <h4 className="font-bold text-[#E05A10] text-xl mb-3">{yajmanData.kathaName}</h4>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {yajmanData.kathaDay && <p><span className="text-[#3D2B20]/60">दिवस:</span> <strong className="text-[#3D2B20]">{yajmanData.kathaDay}</strong></p>}
                        {yajmanData.kathaDate && <p><span className="text-[#3D2B20]/60">दिनांक:</span> <strong className="text-[#3D2B20]">{new Date(yajmanData.kathaDate).toLocaleDateString('hi-IN')}</strong></p>}
                        {yajmanData.kathaTime && <p><span className="text-[#3D2B20]/60">समय:</span> <strong className="text-[#3D2B20]">{yajmanData.kathaTime}</strong></p>}
                      </div>
                    </div>

                    {yajmanData.blessingMessage && (
                      <div className="relative pt-6">
                        <span className="absolute top-0 left-0 text-5xl text-[#E05A10]/20 font-serif leading-none">"</span>
                        <p className="text-lg italic text-[#3D2B20] font-medium leading-relaxed pl-6 relative z-10">
                          {yajmanData.blessingMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Family Members */}
                {yajmanData.familyMembers.filter(m => m.isVisible).length > 0 && (
                  <div className="mt-20 max-w-6xl mx-auto">
                    <h3 className="text-2xl font-black text-center text-[#8A2900] uppercase mb-10 tracking-wide flex items-center justify-center gap-4">
                      <span className="w-12 h-px bg-[#E05A10]/30 hidden sm:block"></span>
                      समस्त यजमान परिवार
                      <span className="w-12 h-px bg-[#E05A10]/30 hidden sm:block"></span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                      {yajmanData.familyMembers.filter(m => m.isVisible).map((member, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                          <div className="w-32 h-32 rounded-full p-1 bg-white shadow-md border border-[#EAD8C8] mb-4 overflow-hidden relative">
                            {member.originalImageUrl ? (
                              <div className="w-full h-full rounded-full overflow-hidden">
                                <img src={member.originalImageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={renderCropStyle(member.cropData, 1.1)} />
                              </div>
                            ) : (
                              <div className="w-full h-full rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#E05A10]/40 text-2xl font-bold">
                                {member.name ? member.name.charAt(0) : '?'}
                              </div>
                            )}
                          </div>
                          <h4 className="font-bold text-[#3D2B20] text-center uppercase tracking-wide">{member.name}</h4>
                          <p className="text-sm font-semibold text-[#E05A10]">{member.relation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-full bg-[#FFFDF7] w-full">
      <div className="p-4 sm:p-8 w-full max-w-6xl mx-auto space-y-6 font-sans pb-24">
        {isPreviewOpen && renderPreview()}
      <SmartImageCropper 
        isOpen={cropModalConfig.isOpen}
        imageUrl={cropModalConfig.imageUrl}
        initialCropData={cropModalConfig.initialCropData}
        aspectRatio={cropModalConfig.aspectRatio}
        onSave={handleSaveCrop}
        onClose={() => setCropModalConfig({ isOpen: false, target: null, imageUrl: '', initialCropData: '' })}
      />
      
      {/* Header */}
      <div className="lg:sticky lg:top-0 lg:z-40 lg:bg-[#FFFDF7] lg:pb-4 lg:-mx-8 lg:px-8 lg:pt-8 lg:-mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
          <div className="w-full">
            <h2 className="text-2xl font-black font-serif text-[#3D2B20] flex flex-wrap items-center gap-3">
              <span>Yajman Management</span>
              <button 
                type="button"
                onClick={() => {
                  setYajmanData(prev => ({ ...prev, isPublished: !prev.isPublished }));
                  setHasUnsavedChanges(true);
                }}
                className="flex items-center cursor-pointer bg-gray-50 px-3 py-1 rounded-full border border-gray-200 shadow-sm ml-2 focus:outline-none focus:ring-2 focus:ring-[#E05A10]/20"
              >
                <div className="relative">
                  <div className={`block w-10 h-6 rounded-full transition-colors ${yajmanData.isPublished ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${yajmanData.isPublished ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <div className={`ml-2 text-xs font-bold ${yajmanData.isPublished ? 'text-green-600' : 'text-gray-500'}`}>
                  {yajmanData.isPublished ? 'PUBLISHED' : 'HIDDEN'}
                </div>
              </button>
            </h2>
            <p className="text-[#3D2B20]/60 text-sm mt-1">Manage the details displayed in the "Yajman Introduction" section.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full md:w-auto">
            {yajman && (
               <button onClick={handleDelete} className="p-2.5 sm:px-4 sm:py-2.5 text-red-500 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors shadow-sm" title="Delete">
                 <FaTrash />
               </button>
            )}
            <button onClick={() => setIsPreviewOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#FFF9F0] text-[#8B5A2B] border border-[#EAD8C8] px-4 py-2.5 rounded-xl font-bold hover:bg-[#F5E6D3] transition-colors shadow-sm">
              <FaEye /> Preview
            </button>
            <button onClick={handleResetForm} disabled={!hasUnsavedChanges} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-gray-500 border border-gray-200 px-4 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50">
              <FaUndo /> Reset
            </button>
            <button onClick={handleSave} disabled={isSaving || !hasUnsavedChanges} className={`flex-[2] md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-md ${hasUnsavedChanges ? 'bg-[#E05A10] text-white hover:bg-[#C04000]' : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
              <FaSave /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Right Column: Text Details (Renders first on mobile) */}
        <div className="lg:col-span-2 space-y-6 lg:order-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
            <h3 className="font-bold text-[#3D2B20] w-full mb-6 border-b border-[#EAD8C8] pb-2 text-lg flex items-center gap-2"><FaUser className="text-[#E05A10]" /> Primary Information</h3>
            
            {/* GROUP 1: BASIC */}
            <div className="mb-6">
              <h4 className="text-[11px] font-black text-[#A44200] uppercase tracking-wider mb-3 bg-orange-50 inline-flex items-center gap-1.5 px-2 py-1 rounded"><FaUser /> 1. Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Yajman Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaUser className="text-[#E05A10]/70" /></div>
                    <input type="text" name="yajmanName" value={yajmanData.yajmanName} onChange={handleChange} maxLength="100" placeholder="[ e.g. श्री राम ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.yajmanName || '').length}/100</div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Wife's Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaUser className="text-[#E05A10]/70" /></div>
                    <input type="text" name="wifeName" value={yajmanData.wifeName} onChange={handleChange} maxLength="100" placeholder="[ e.g. श्रीमती सीता ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.wifeName || '').length}/100</div>
                </div>
              </div>
            </div>

            {/* GROUP 2: LOCATION */}
            <div className="mb-6">
              <h4 className="text-[11px] font-black text-[#A44200] uppercase tracking-wider mb-3 bg-orange-50 inline-flex items-center gap-1.5 px-2 py-1 rounded"><FaMapMarkerAlt /> 2. Location</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Native Place</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaHome className="text-[#E05A10]/70" /></div>
                    <input type="text" name="nativePlace" value={yajmanData.nativePlace} onChange={handleChange} maxLength="100" placeholder="[ e.g. मिथिला ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.nativePlace || '').length}/100</div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Current Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaMapMarkerAlt className="text-[#E05A10]/70" /></div>
                    <input type="text" name="currentAddress" value={yajmanData.currentAddress} onChange={handleChange} maxLength="200" placeholder="[ e.g. अयोध्या ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.currentAddress || '').length}/200</div>
                </div>
              </div>
            </div>

            {/* GROUP 3: KATHA */}
            <div className="mb-6">
              <h4 className="text-[11px] font-black text-[#A44200] uppercase tracking-wider mb-3 bg-orange-50 inline-flex items-center gap-1.5 px-2 py-1 rounded"><FaOm /> 3. Katha Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1 relative">
                  <label className="text-sm font-bold text-[#3D2B20]">Katha Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaOm className="text-[#E05A10]/70" /></div>
                    <input type="text" name="kathaName" value={yajmanData.kathaName} onChange={handleChange} maxLength="100" onFocus={() => setIsKathaNameDropdownOpen(true)} onBlur={() => setTimeout(() => setIsKathaNameDropdownOpen(false), 200)} placeholder="[ e.g. श्रीमद् भागवत कथा ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.kathaName || '').length}/100</div>
                  {isKathaNameDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-full">
                      <div className="max-h-60 overflow-y-auto">
                        {kathaNamesList.map(name => (
                          <div key={name} className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50" onClick={() => {handleChange({target:{name:'kathaName',value:name}});setIsKathaNameDropdownOpen(false);}}>{name}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-1 relative">
                  <label className="text-sm font-bold text-[#3D2B20]">Katha Day</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaCalendarAlt className="text-[#E05A10]/70" /></div>
                    <input type="text" name="kathaDay" value={yajmanData.kathaDay} onChange={handleChange} maxLength="50" onFocus={() => setIsDayDropdownOpen(true)} onBlur={() => setTimeout(() => setIsDayDropdownOpen(false), 200)} placeholder="[ e.g. प्रथम दिवस ]" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-colors" />
                  </div>
                  <div className="text-[10px] text-gray-400 text-right">{(yajmanData.kathaDay || '').length}/50</div>
                  {isDayDropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-full">
                      <div className="max-h-60 overflow-y-auto">
                        {days.map(day => (
                          <div key={day} className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50" onClick={() => {handleChange({target:{name:'kathaDay',value:day}});setIsDayDropdownOpen(false);}}>{day}</div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Katha Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaCalendarAlt className="text-[#E05A10]/70" /></div>
                    <input type="date" name="kathaDate" value={yajmanData.kathaDate} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#3D2B20]">Katha Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaClock className="text-[#E05A10]/70" /></div>
                    <input type="time" name="kathaTime" value={yajmanData.kathaTime} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 outline-none transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* GROUP 4: MESSAGE */}
            <div>
              <h4 className="text-[11px] font-black text-[#A44200] uppercase tracking-wider mb-3 bg-orange-50 inline-flex items-center gap-1.5 px-2 py-1 rounded"><FaQuoteLeft /> 4. Message</h4>
              <div className="space-y-1 relative">
                <label className="text-sm font-bold text-[#3D2B20]">Blessing / Message</label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-3 flex items-start pointer-events-none"><FaQuoteLeft className="text-[#E05A10]/70" /></div>
                  <textarea name="blessingMessage" value={yajmanData.blessingMessage} onChange={handleChange} onFocus={() => setIsBlessingDropdownOpen(true)} onBlur={() => setTimeout(() => setIsBlessingDropdownOpen(false), 200)} rows={4} placeholder="[ हमारे परिवार की ओर से आप सभी का हार्दिक स्वागत है। ]" maxLength="1000" className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EAD8C8] bg-[#FFFDF7] focus:bg-white focus:ring-2 focus:ring-[#E05A10]/20 outline-none resize-none transition-colors"></textarea>
                </div>
                <div className="text-xs text-gray-400 text-right">{(yajmanData.blessingMessage || '').length}/1000</div>
                {isBlessingDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-[100%] left-0">
                    <div className="max-h-60 overflow-y-auto">
                      {blessingMessagesList.map((msg, i) => (
                        <div key={i} className="px-4 py-2 text-sm cursor-pointer hover:bg-orange-50 border-b border-gray-100" onClick={() => {handleChange({target:{name:'blessingMessage',value:msg}});setIsBlessingDropdownOpen(false);}}>{msg}</div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Left Column: Image Upload (Renders second on mobile) */}
        <div className="lg:col-span-1 space-y-6 lg:order-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8] flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4 border-b border-[#EAD8C8] pb-2">
              <h3 className="font-bold text-[#3D2B20] flex items-center gap-2"><FaImage className="text-[#E05A10]" /> Profile Image</h3>
              {(yajmanData.originalImageUrl || yajmanData.profileImageUrl) && (
                 <button onClick={() => openCropper('main')} className="text-xs font-bold text-[#E05A10] flex items-center gap-1 hover:underline"><FaCrop/> Adjust Crop</button>
              )}
            </div>
            
            <div className="w-full max-w-sm lg:max-w-none aspect-[4/5] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-[#E05A10]">
              {(yajmanData.originalImageUrl || yajmanData.profileImageUrl) ? (
                <>
                  <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#FAF6F0]">
                     <img src={yajmanData.originalImageUrl || yajmanData.profileImageUrl} alt="Yajman" className="w-full h-full object-cover" style={renderCropStyle(yajmanData.cropData)} />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-4">
                    <button onClick={() => document.getElementById('yajmanImageInput').click()} className="bg-white text-[#3D2B20] p-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg" title="Replace">
                      <FaImage />
                    </button>
                    <button onClick={() => handleRemoveImage('main')} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg" title="Remove">
                      <FaTrash />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 cursor-pointer" onClick={() => document.getElementById('yajmanImageInput').click()}>
                  <FaImage className="text-4xl text-gray-400 mx-auto mb-3 group-hover:text-[#E05A10] transition-colors" />
                  <p className="text-sm font-semibold text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 800x1000px</p>
                </div>
              )}
              <input 
                type="file" 
                id="yajmanImageInput" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleImageUpload(e, 'main')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Family Members Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
        <div className="flex justify-between items-center mb-6 border-b border-[#EAD8C8] pb-4">
          <div>
            <h3 className="font-bold text-xl text-[#3D2B20] flex items-center gap-2"><FaUsers className="text-[#E05A10]" /> Family Members</h3>
            <p className="text-sm text-gray-500">Manage family members. Order them with arrows. Hide members you don't want on the frontend.</p>
          </div>
          <button onClick={handleAddFamilyMember} className="flex items-center space-x-2 bg-[#E05A10]/10 hover:bg-[#E05A10]/20 text-[#E05A10] px-4 py-2 rounded-xl font-bold transition-all">
            <FaPlus className="text-sm" /> <span>Add Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {yajmanData.familyMembers.map((member, index) => (
            <div key={index} className={`bg-gray-50 p-4 rounded-2xl border ${!member.isVisible ? 'border-dashed border-gray-300 opacity-60' : 'border-gray-200'} relative group transition-all`}>
              
              {/* Card Actions */}
              <div className="absolute -top-3 -right-3 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => handleFamilyMemberChange(index, 'isVisible', !member.isVisible)} className={`p-2 rounded-full shadow-md text-white ${member.isVisible ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-500 hover:bg-gray-600'}`} title={member.isVisible ? 'Hide on frontend' : 'Show on frontend'}>
                   {member.isVisible ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                 </button>
                 <button onClick={() => handleRemoveFamilyMember(index)} className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600" title="Remove">
                   <FaTrash className="text-xs" />
                 </button>
              </div>

              {/* Order Controls */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                 {index > 0 && (
                   <button onClick={() => moveMember(index, 'up')} className="p-1 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-100 text-gray-500" title="Move Up"><FaArrowUp className="text-[10px]"/></button>
                 )}
                 {index < yajmanData.familyMembers.length - 1 && (
                   <button onClick={() => moveMember(index, 'down')} className="p-1 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-100 text-gray-500" title="Move Down"><FaArrowDown className="text-[10px]"/></button>
                 )}
              </div>

              <div className="flex flex-col items-center space-y-4 pt-2">
                <div className="relative group/image">
                  <div className="w-24 h-24 bg-white rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {member.originalImageUrl ? (
                      <div className="w-full h-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img src={member.originalImageUrl} alt={member.name} className="w-full h-full object-cover" style={renderCropStyle(member.cropData)} />
                      </div>
                    ) : (
                      <FaImage className="text-gray-400 text-2xl group-hover/image:text-[#E05A10]" />
                    )}
                  </div>
                  {/* Image Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover/image:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <button onClick={() => document.getElementById(`familyMemberImage_${index}`).click()} className="text-white hover:text-[#E05A10] p-1"><FaImage/></button>
                    {member.originalImageUrl && (
                      <button onClick={() => openCropper('member', index)} className="text-white hover:text-[#E05A10] p-1"><FaCrop/></button>
                    )}
                  </div>
                  <input type="file" id={`familyMemberImage_${index}`} accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'member', index)} />
                </div>

                <div className="w-full space-y-3">
                  <div>
                    <input type="text" value={member.name} onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)} placeholder="[ Name ]" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 outline-none text-sm text-center font-bold text-[#3D2B20]" />
                  </div>
                  <div>
                    <input type="text" value={member.relation} onChange={(e) => handleFamilyMemberChange(index, 'relation', e.target.value)} placeholder="[ Relation ]" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 outline-none text-xs text-center text-gray-500" />
                  </div>
                </div>
                {!member.isVisible && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200 px-2 py-0.5 rounded-full">HIDDEN</span>}
              </div>
            </div>
          ))}
          {yajmanData.familyMembers.length === 0 && (
            <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
              <FaPlus className="mx-auto text-3xl mb-3 opacity-20" />
              <p className="font-medium">No family members added yet.</p>
              <p className="text-sm">Click "Add Member" to create your family tree.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
