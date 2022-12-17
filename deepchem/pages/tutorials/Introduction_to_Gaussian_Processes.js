
                    import TutorialLayout from "../../layouts/tutorial";
                    import notebookStyles from "../../data/tutorials/styles";
                    import innerHTML from "../../data/tutorials/Introduction_to_Gaussian_Processes.js";
                    import {useEffect} from "react";
                    import scrollnav from "scrollnav";

                    const Introduction_to_Gaussian_Processes = () => {

                    useEffect(() => {
                            document.getElementsByClassName('scroll-nav')[0]?.remove();
                            const content = document.querySelector(".notebook");
                            const insertTarget = document.querySelector(".notebook");

                            if (insertTarget && content) {
                                scrollnav.init(content, {
                                    sections: "h1, h2", insertTarget: insertTarget, insertLocation: "after",
                                });
                            }

                            MathJax?.Hub?.Queue(["Typeset", MathJax.Hub]);
                        }, []);

                    return <div dangerouslySetInnerHTML={{
                                           __html: `${innerHTML.html} ${notebookStyles}`,
                                       }}
                                   ></div>
                                   }

                    Introduction_to_Gaussian_Processes.Layout = TutorialLayout;

                    export default Introduction_to_Gaussian_Processes;
                