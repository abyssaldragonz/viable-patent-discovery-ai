import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function Response( {item} ) {
    const [isOpened, toggleCard] = useState(false);
    var rating_color = useState("text-emerald-500")

    if (item.viability_rating <= 3) {
        rating_color = "text-red-500"
    }
    else if (item.viability_rating <= 5) {
        rating_color = "text-yellow-500"
    }
    else if (item.viability_rating <= 8) {
        rating_color = "text-lime-500"
    }
    else if (item.viability_rating <= 10) {
        rating_color = "text-emerald-500"
    }

    return (
        <div className={`w-full font-mono text-black bg-white rounded-xl p-4 transition-all duration-200 ease-out ${isOpened ? "" : "hover:scale-105"}`}>

            {/* title */}
            <div className="flex gap-4 items-center font-gugi cursor-pointer" onClick={()=>{toggleCard(!isOpened)}}>
                {/* chevron */}
                {isOpened ? <ChevronDown size={32} /> : <ChevronRight size={32} />}

                <div className="flex justify-between w-full">
                    <h2 className="text-xs m-0 leading-loose">{item.idea_name}</h2>
                    <span className={`text-lg leading-loose ${rating_color}`}>{item.viability_rating}/10</span>
                </div>
            </div>

            { isOpened &&
                <div className="text-black text-left">
                    <hr className="p-2" />
                    <div className="flex flex-col gap-8"> 
                        <div>
                            <h3>📜 Summary of Patent</h3>
                            <p>{item.patent_summary}</p>
                            <a className="text-blue-500 hover:underline" href={item.patent_link} target="_blank">{item.patent_link}</a>
                        </div>

                        <div>
                            <h3>🔎 Scientific Breakdown</h3>
                            <p>{item.scientific_breakdown}</p>
                        </div>
                        
                        <div>
                            <h3>📑 Value Proposition</h3>
                            <p>{item.value_prop}</p>
                        </div>
                        
                        <div>
                            <h3>🗝️ Key Stakeholders and Technical Expertise</h3>
                            <p>{item.key_stakeholders}</p>
                        </div>

                        <div>
                            <h3>📈 Market Sizing</h3>
                            <p>{item.market_sizing}</p>
                        </div>
                        
                        <div>
                            <h3>📎 References</h3>
                            <ol className="list-decimal ml-8">
                                { Array.from(item.references).map((r, i) => 
                                        <li key={i}>{r.name} - <a className="text-blue-500 hover:underline" href={r.link} target="_blank">{r.link}</a> </li>
                                    )
                                }
                            </ol>
                        </div>

                    </div>
                        


                    {/* <TypeAnimation
                        sequence={[
                            item.patent_summary + '\n\n' +
                            item.scientific_breakdown + '\n\n' +
                            item.value_prop + '\n\n' +
                            item.key_stakeholders + '\n\n' +
                            item.market_sizing + '\n\n'
                        ]}
                        wrapper="span"
                        speed={105}
                        style={{ fontSize: '1em', display: 'inline-block', whiteSpace:'pre-line' }}
                        cursor={false}
                    /> */}

                </div>
            }
        </div>
    )
}