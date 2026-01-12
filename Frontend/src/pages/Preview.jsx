import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Share2, Eye, Download } from 'lucide-react';
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';

const Preview = () => {
  const { resumeId } = useParams();
  const resume = dummyResumeData.find((item) => item._id === resumeId);

  const handleDownload = () => {
    const resumeNode = document.getElementById('resume-preview');
    if (!resumeNode) return;
    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Resume</title>');
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
      printWindow.document.write(el.outerHTML);
    });
    printWindow.document.write('</head><body>');
    printWindow.document.write(resumeNode.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: resume?.title || 'My Resume',
          text: 'Check out my resume',
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/app"
              className="group inline-flex gap-3 items-center px-4 py-2.5 bg-white border border-slate-300 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300"
            >
              <ArrowLeftIcon className="size-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
              <span className="text-slate-700 group-hover:text-blue-800 font-medium">Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <p className="text-sm text-slate-700">
                  Previewing:{' '}
                  <span className="font-semibold text-blue-800">
                    {resume?.title || 'Untitled resume'}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 hover:shadow-md transition-all duration-300 group"
                >
                  <Share2 className="size-4 text-slate-500 group-hover:text-purple-600" />
                  <span className="text-slate-700 group-hover:text-purple-800 font-medium">Share</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download className="size-4" />
                  <span className="font-medium">Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="size-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Live Preview</h2>
          </div>
          <p className="text-slate-600">
            This is how your resume will look to others. Changes made in the builder will reflect here in real-time.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <ResumePreview data={resume} removeBackground={false} />
        </div>
      </div>
    </div>
  );
};

export default Preview;