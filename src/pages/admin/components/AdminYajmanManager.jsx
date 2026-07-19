import React, { useState, useContext, useEffect } from 'react';
import { FaSave, FaImage, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AppContext } from '../../../context/AppContext';

export default function AdminYajmanManager() {
  const { getAuthHeaders, handleResponse, yajman, setYajman } = useContext(AppContext);
  const [yajmanData, setYajmanData] = useState({
    yajmanName: '',
    currentAddress: '',
    nativePlace: '',
    kathaDay: '',
    kathaDate: '',
    kathaTime: '',
    kathaName: '',
    blessingMessage: '',
    familyMembersCount: 1,
    profileImageUrl: ''
  });

  useEffect(() => {
    if (yajman) {
      setYajmanData({
        yajmanName: yajman.yajmanName || '',
        currentAddress: yajman.currentAddress || '',
        nativePlace: yajman.nativePlace || '',
        kathaDay: yajman.kathaDay || '',
        kathaDate: yajman.kathaDate || '',
        kathaTime: yajman.kathaTime || '',
        kathaName: yajman.kathaName || '',
        blessingMessage: yajman.blessingMessage || '',
        familyMembersCount: yajman.familyMembersCount || 1,
        profileImageUrl: yajman.profileImageUrl || ''
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

  const handleRemoveImage = () => {
    setYajmanData(prev => ({ ...prev, profileImageUrl: '' }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/yajman', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...yajmanData,
          familyMembersCount: parseInt(yajmanData.familyMembersCount) || 1
        })
      });
      const res = await handleResponse(response);
      if (res.ok) {
        const savedData = await res.json();
        setYajman(savedData);
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

  return (
    <div className="p-4 sm:p-8 w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#EAD8C8]">
        <div>
          <h2 className="text-2xl font-black font-serif text-[#3D2B20]">Yajman Management</h2>
          <p className="text-[#3D2B20]/60 text-sm mt-1">Manage the details displayed in the "Yajman Introduction" section on the frontend.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-[#E05A10] hover:bg-[#C04000] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-70"
        >
          <FaSave />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
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
                  <p className="text-xs text-gray-400 mt-1">Recommended size: 800x1000px</p>
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
              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Yajman Name (मुख्य यजमान)</label>
                <input 
                  type="text" 
                  name="yajmanName"
                  value={yajmanData.yajmanName} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Current Address (वर्तमान निवास)</label>
                <input 
                  type="text" 
                  name="currentAddress"
                  value={yajmanData.currentAddress} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Native Place (मूल निवास)</label>
                <input 
                  type="text" 
                  name="nativePlace"
                  value={yajmanData.nativePlace} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Day (कथा दिवस)</label>
                <input 
                  type="text" 
                  name="kathaDay"
                  value={yajmanData.kathaDay} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Date (दिनांक)</label>
                <input 
                  type="text" 
                  name="kathaDate"
                  value={yajmanData.kathaDate} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Time (कथा समय)</label>
                <input 
                  type="text" 
                  name="kathaTime"
                  value={yajmanData.kathaTime} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Katha Name (आयोजन)</label>
                <input 
                  type="text" 
                  name="kathaName"
                  value={yajmanData.kathaName} 
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Total Family Members (सदस्य संख्या)</label>
                <div className="flex items-center space-x-3">
                  <button 
                    type="button"
                    onClick={() => setYajmanData(prev => ({ ...prev, familyMembersCount: Math.max(1, prev.familyMembersCount - 1) }))}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <FaMinus className="text-gray-600" />
                  </button>
                  <input 
                    type="number" 
                    name="familyMembersCount"
                    value={yajmanData.familyMembersCount} 
                    onChange={handleChange}
                    className="w-20 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all text-center font-bold"
                  />
                  <button 
                    type="button"
                    onClick={() => setYajmanData(prev => ({ ...prev, familyMembersCount: prev.familyMembersCount + 1 }))}
                    className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <FaPlus className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-bold text-[#3D2B20]">Blessing / Message (आशीर्वाद संदेश)</label>
                <textarea 
                  name="blessingMessage"
                  value={yajmanData.blessingMessage} 
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E05A10]/20 focus:border-[#E05A10] outline-none transition-all resize-none leading-relaxed"
                ></textarea>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
