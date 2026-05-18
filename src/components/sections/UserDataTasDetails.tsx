import { User } from '@/types/user'
import { Mail } from 'lucide-react'
import React from 'react'

const UserDataTasDetails = ({user,isCreator}:{user:User,isCreator:boolean}) => {
  return (
    <div> 
      {isCreator? (        
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden">
            {/* Assignee Card */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Active Assignee
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
            </div>

            {user ? (
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-xl shadow-slate-200 ring-4 ring-slate-50">
                  SJ
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">
                    {user?.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    {user?.role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="font-bold text-slate-900 text-lg leading-tight  p-3 " >Not Assigned</div>
            )}

            {user ? (
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all border border-slate-200">
                  <Mail size={16} />
                  Message
                </button>
                <button className="w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100/50">
                  Reassign Task
                </button>
              </div>
            ) : (
              <div>
                <button className="w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100/50">
                  Assign Task
                </button>
              </div>
            )}
          </section>):(<section>hai</section>)}</div>
  )
}

export default UserDataTasDetails