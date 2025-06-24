import React from 'react'

function Proceedings() {
  return (
    <>
      <section className="py-16 bg-blue-950 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            
            <h1 className="font-bold text-3xl pb-4 xl:text-4xl text-white dark:text-white">
              Proceedings & Publications
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-600 font-semibold">
                  Scopus
                </span>
              </div>
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-600 font-semibold">
                  SCIE
                </span>
              </div>
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-600 font-semibold">
                  Web of Science
                </span>
              </div>
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm text-gray-600 font-semibold">
                  Clarivate
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              <strong>Note:</strong> ICLSMHA-2026 Proceedings will be submitted
              to the Web of Science Book Citation Index (BkCI) and Scopus for
              evaluation and indexing purposes. Terms & Conditions apply.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Proceedings
