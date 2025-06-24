import React from 'react'
import { Separator } from '../ui/separator';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

function Footer() {
  return (
    <>
      <footer className="bg-blue-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/cerada.png"
                  alt="CERADA Logo"
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className=" text-base">
                  &quot;International Conference on Life Sciences and
                  Multidisciplinary Healthcare Approaches&quot;
                </p>
                <p className=" text-base">
                  Theme: &quot;Bridging Science and Practice: Multidisciplinary
                  Approaches to Health and Wellbeing&quot;
                </p>
                <p>
                  Organized by: Confworld Educational Research and Development
                  Association
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About Conference
                  </a>
                </li>
                <li>
                  <a
                    href="#tracks"
                    className="hover:text-white transition-colors"
                  >
                    Session Tracks
                  </a>
                </li>
                <li>
                  <a
                    href="#registration"
                    className="hover:text-white transition-colors"
                  >
                    Registration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Submission Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Important Dates</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Early Bird: 31 Aug 2025</li>
                <li>Abstract: 30 Sep 2025</li>
                <li>Full Paper: 31 Oct 2025</li>
                <li>Final Reg: 30 Nov 2025</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Kuala Lumpur, Malaysia</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>14-15 May, 2026</span>
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2026 ICLSMHA. All rights reserved.</p>
            <p>
              Organized by: Confworld Educational Research and Development
              Association
            </p>
            <p>This website is designed by Shahawar Alim for an assessment.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer

