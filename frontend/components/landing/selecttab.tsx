'use client'

import { useState } from "react"

const SelectTab = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {id: 'tab1', label: 'Samachar',header: 'Be in the know', content: 'From sports to entertainment, Economy, Finance and more. Keep an eye on the events of your interest'},
    {id: 'tab2', label: 'Vichaar', header: 'Use what you know', content:'Use what you know and form opinions based on the upcoming events in the world'},
    {id: 'tab3', label: 'Vyaapar', header: 'Trade and grow', content: 'Invest in your opinions about future events and use your knowledge to trade and benefit'}
  ]

  return (
    <>
    <div className="w-full">
      <div className=" pl-40 pt-20">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pt-32 pr-10 items-start text-5xl ${activeTab === tab.id ? 'text-slate-100' : 'text-slate-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className='pt-10 font-bold text-slate-100 text-3xl pl-40'>
        {tabs.find(tab => tab.id === activeTab)?.header}
      </div>
      <div className='pl-40 text-2xl py-2 text-slate-100 max-w-2xl'>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
    </>
  )
}

export default SelectTab
