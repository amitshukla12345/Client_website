import React, { useState, useContext, useEffect } from 'react';
import { FaSave, FaImage, FaTrash, FaPlus, FaMinus, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AppContext } from '../../../context/AppContext';

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

  const [yajmanData, setYajmanData] = useState({
    yajmanName: '',
    wifeName: '',
    currentAddress: '',
    nativePlace: '',
    kathaDay: '',
    kathaDate: '',
    kathaTime: '',
    kathaName: '',
    blessingMessage: '',
    profileImageUrl: '',
    familyMembers: []
  });

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
        profileImageUrl: yajman.profileImageUrl || '',
        familyMembers: yajman.familyMembers || []
      });
    }
  }, [yajman]);

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setYajmanData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Image exceeds 500KB limit. Please choose a smaller image.");
        e.target.value = ''; // Reset input
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setYajmanData(prev => ({ ...prev, profileImageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFamilyMember = () => {
    setYajmanData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { name: '', relation: '', imageUrl: '' }]
    }));
  };

  const handleRemoveImage = () => {
    setYajmanData(prev => ({ ...prev, profileImageUrl: '' }));
  };

  const handleRemoveFamilyMember = (index) => {
    setYajmanData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, i) => i !== index)
    }));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setYajmanData(prev => {
      const newMembers = [...prev.familyMembers];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, familyMembers: newMembers };
    });
  };

  const handleFamilyMemberImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Image exceeds 500KB limit. Please choose a smaller image.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFamilyMemberChange(index, 'imageUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
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
        alert('यजमान विवरण सफलतापूर्वक सहेज लिया गया है! (Yajman details saved successfully!)');
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

  const handleDelete = async () => {
    if (window.confirm("क्या आप वाकई यजमान का सारा डेटा डिलीट करना चाहते हैं? (Are you sure you want to delete the Yajman data?)")) {
      try {
        const response = await fetch('http://localhost:8080/api/admin/yajman', {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        if (response.ok) {
          setYajman(null);
          setYajmanData({
            yajmanName: '',
            wifeName: '',
            currentAddress: '',
            nativePlace: '',
            kathaDay: '',
            kathaDate: '',
            kathaTime: '',
            kathaName: '',
            blessingMessage: '',
            familyMembersCount: 1,
            profileImageUrl: '',
            familyPhotoUrl: ''
          });
          alert("डेटा सफलतापूर्वक डिलीट हो गया है! (Data deleted successfully!)");
        } else {
          alert("डिलीट करने में समस्या आई। (Failed to delete.)");
        }
      } catch (error) {
        console.error('Error deleting yajman:', error);
        alert("कोई त्रुटि हुई। (An error occurred.)");
      }
    }
  };

  return (
    <div className="p-4 sm:p-8 w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
        <div>
          <h2 className="text-2xl font-black font-serif text-[#3D2B20]">Yajman Management</h2>
          <p className="text-[#3D2B20]/60 text-sm mt-1">Manage the details displayed in the "Yajman Introduction" section on the frontend.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95"
            title="Delete current Yajman from database"
          >
            <FaTrash />
            <span className="hidden sm:inline">Delete</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-[#E05A10] hover:bg-[#C04000] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-70"
          >
            <FaSave />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8] flex flex-col items-center">
            <h3 className="font-bold text-[#3D2B20] w-full mb-4 border-b border-[#EAD8C8] pb-2">Profile Image</h3>
            
            <div className="w-full aspect-[4/5] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group transition-all hover:border-[#E05A10]">
              {yajmanData.profileImageUrl ? (
                <>
                  <img src={yajmanData.profileImageUrl} alt="Yajman Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button onClick={handleRemoveImage} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                      <FaTrash />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 cursor-pointer" onClick={() => document.getElementById('yajmanImageInput').click()}>
                  <FaImage className="text-4xl text-gray-400 mx-auto mb-3 group-hover:text-[#E05A10] transition-colors" />
                  <p className="text-sm font-semibold text-gray-600">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended: 800x1000px (Max 500KB)</p>
                </div>
              )}
              <input 
                type="file" 
                id="yajmanImageInput" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
          </div>


        </div>

        {/* Right Column: Text Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
            <h3 className="font-bold text-[#3D2B20] w-full mb-6 border-b border-[#EAD8C8] pb-2">Primary Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Yajman Name (मुख्य यजमान)</label>
                <input 
                  type="text" 
                  name="yajmanName"
                  value={yajmanData.yajmanName} 
                  onChange={handleChange}
                  placeholder="उदा. श्री राम"
                  maxLength="255"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all font-medium placeholder-gray-400"
                />
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.yajmanName || '').length}/255</div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Wife's Name (पत्नी का नाम)</label>
                <input 
                  type="text" 
                  name="wifeName"
                  value={yajmanData.wifeName || ''} 
                  onChange={handleChange}
                  placeholder="उदा. श्रीमती सीता"
                  maxLength="255"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all font-medium placeholder-gray-400"
                />
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.wifeName || '').length}/255</div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Current Address (वर्तमान निवास)</label>
                <input 
                  type="text" 
                  name="currentAddress"
                  value={yajmanData.currentAddress} 
                  onChange={handleChange}
                  placeholder="उदा. अयोध्या नगर"
                  maxLength="255"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all placeholder-gray-400"
                />
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.currentAddress || '').length}/255</div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Native Place (मूल निवास)</label>
                <input 
                  type="text" 
                  name="nativePlace"
                  value={yajmanData.nativePlace} 
                  onChange={handleChange}
                  placeholder="उदा. मिथिला"
                  maxLength="255"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all placeholder-gray-400"
                />
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.nativePlace || '').length}/255</div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Day (कथा दिवस)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="kathaDay"
                    value={yajmanData.kathaDay} 
                    onChange={handleChange}
                    onFocus={() => setIsDayDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsDayDropdownOpen(false), 200)}
                    placeholder="उदा. प्रथम दिवस"
                    maxLength="255"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all placeholder-gray-400"
                  />
                  <div 
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center cursor-pointer text-gray-400 hover:text-[#E05A10]"
                    onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                  >
                    <FaChevronDown className={`transition-transform ${isDayDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isDayDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-full left-0"
                  >
                    <div className="max-h-60 overflow-y-auto py-1">
                      {days.map(day => (
                        <div 
                          key={day}
                          className="px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors text-[#3D2B20] hover:bg-[#E05A10]/10 hover:text-[#E05A10]"
                          onClick={() => {
                            handleChange({ target: { name: 'kathaDay', value: day } });
                            setIsDayDropdownOpen(false);
                          }}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.kathaDay || '').length}/255</div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Date (दिनांक)</label>
                <input 
                  type="date" 
                  name="kathaDate"
                  value={yajmanData.kathaDate} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Time (कथा समय)</label>
                <input 
                  type="time" 
                  name="kathaTime"
                  value={yajmanData.kathaTime} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1 relative">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Name (आयोजन)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="kathaName"
                    value={yajmanData.kathaName} 
                    onChange={handleChange}
                    onFocus={() => setIsKathaNameDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsKathaNameDropdownOpen(false), 200)}
                    placeholder="उदा. श्रीमद् भागवत कथा"
                    maxLength="255"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all placeholder-gray-400"
                  />
                  <div 
                    className="absolute right-0 top-0 bottom-0 px-3 flex items-center cursor-pointer text-gray-400 hover:text-[#E05A10]"
                    onClick={() => setIsKathaNameDropdownOpen(!isKathaNameDropdownOpen)}
                  >
                    <FaChevronDown className={`transition-transform ${isKathaNameDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                
                {isKathaNameDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-full left-0"
                  >
                    <div className="max-h-60 overflow-y-auto py-1">
                      {kathaNamesList.map(name => (
                        <div 
                          key={name}
                          className="px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors text-[#3D2B20] hover:bg-[#E05A10]/10 hover:text-[#E05A10]"
                          onClick={() => {
                            handleChange({ target: { name: 'kathaName', value: name } });
                            setIsKathaNameDropdownOpen(false);
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.kathaName || '').length}/255</div>
              </div>
              


              <div className="md:col-span-2 space-y-1 relative">
                <label className="text-sm font-bold text-[#3D2B20]">Blessing / Message (आशीर्वाद संदेश)</label>
                <div className="relative">
                  <textarea 
                    name="blessingMessage"
                    value={yajmanData.blessingMessage} 
                    onChange={handleChange}
                    onFocus={() => setIsBlessingDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsBlessingDropdownOpen(false), 200)}
                    rows={4}
                    placeholder="यजमान परिवार की ओर से कोई संदेश या आशीर्वाद यहाँ लिखें..."
                    maxLength="1000"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all resize-none leading-relaxed placeholder-gray-400"
                  ></textarea>
                  <div 
                    className="absolute right-0 top-3 px-3 flex items-start cursor-pointer text-gray-400 hover:text-[#E05A10]"
                    onClick={() => setIsBlessingDropdownOpen(!isBlessingDropdownOpen)}
                  >
                    <FaChevronDown className={`transition-transform ${isBlessingDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isBlessingDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute z-50 w-full mt-1 bg-white border border-[#EAD8C8] rounded-xl shadow-xl overflow-hidden top-[100%] left-0 bottom-auto"
                  >
                    <div className="max-h-60 overflow-y-auto py-1">
                      {blessingMessagesList.map((msg, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors text-[#3D2B20] hover:bg-[#E05A10]/10 hover:text-[#E05A10] border-b border-gray-100 last:border-0"
                          onClick={() => {
                            handleChange({ target: { name: 'blessingMessage', value: msg } });
                            setIsBlessingDropdownOpen(false);
                          }}
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <div className="text-xs text-gray-400 text-right mt-1">{(yajmanData.blessingMessage || '').length}/1000</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Family Members Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
        <div className="flex justify-between items-center mb-6 border-b border-[#EAD8C8] pb-4">
          <div>
            <h3 className="font-bold text-xl text-[#3D2B20]">Family Members</h3>
            <p className="text-sm text-gray-500">Add individual family members and their photos.</p>
          </div>
          <button
            onClick={handleAddFamilyMember}
            className="flex items-center space-x-2 bg-[#EAD8C8]/50 hover:bg-[#EAD8C8] text-[#3D2B20] px-4 py-2 rounded-xl font-bold transition-all"
          >
            <FaPlus className="text-sm" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {yajmanData.familyMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 relative group">
              <button
                onClick={() => handleRemoveFamilyMember(index)}
                className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Remove Member"
              >
                <FaTrash className="text-xs" />
              </button>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-white rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group/image cursor-pointer" onClick={() => document.getElementById(`familyMemberImage_${index}`).click()}>
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <FaImage className="text-gray-400 text-2xl group-hover/image:text-[#E05A10]" />
                  )}
                  <input
                    type="file"
                    id={`familyMemberImage_${index}`}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFamilyMemberImageUpload(index, e)}
                  />
                </div>

                <div className="w-full space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleFamilyMemberChange(index, 'name', e.target.value)}
                      placeholder="उदा. रमेश"
                      maxLength="100"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#E05A10] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Relation</label>
                    <input
                      type="text"
                      value={member.relation}
                      onChange={(e) => handleFamilyMemberChange(index, 'relation', e.target.value)}
                      placeholder="उदा. पुत्र"
                      maxLength="100"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#E05A10] outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {yajmanData.familyMembers.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-400 italic">
              No family members added yet. Click "Add Member" to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
