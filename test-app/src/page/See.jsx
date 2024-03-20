
import React, { useEffect, useState, useRef } from 'react'

function See({sideopen,selectedMail}) {
    // const [sideopen,setsideOpen] = useState();
    console.log(selectedMail)
    if (selectedMail == null){
      return
    }else{
  return (
    <div className='see'>
                <div className={`Subject-mail ${sideopen? 'active' : 'inactive'}`}>The Subject</div>
                <div  className={`next-2 ${sideopen? 'active' : 'inactive'}`}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0UlEQVR4nO3Yu48NYRjH8Y9LwgoKEhIaiUpcotlCQ+HyB1iRiEYUG41GIpRUKBRUNBJqcam2QaFZhH4VRBRbSDYR9yxrZZL3JJPJ7plzeOfMeeX9Jr/2mflmZp7neYdMJpPJZDKZ/56teIXHEmYfPmA+JEnGMVuSSE5kBW5VBJIT2YRni0gkI7IH010kkhA5jm81EkMtsgyXexAYapH1YTbM95GPmMJT3MUFHMLatiR24m2fEt0yhxc4jXWDkhjD54gS1fzAHWxpSmAJLuJ3gxLlfMcVrIkpsRr3BiRQzWvsiiXyvCWJTr7iaAyRbtN6UPkV5tU/Ubyn94dE5kiMj/1caJVtynzBdgm0314yhVWxBuKblmUuaXFFiZnZWK9YwXJc6+PiI9gQzvGjOIyzuBE6Y/VEWZdiX4vKybBa1F24jpFwzr+K9z3Um8OOYT9YFV1yPyZq1qKbGmBzzRbwt4yG7Xihmp/CChWdlbgdWaRgKc7j5wJ1o6wvi3EmTOJYIh0OhKFYrlv8tWmUg5iJLFKwN6z5nbrT4ZtqlKLVvsSjyHVPVJ7KbgnzoCRySsJsKy2x1yXOwyDyROIcCyLvJM7GIFJ0seSZwGTbN5HJZLTDH+jVDXaqLLhDAAAAAElFTkSuQmCC"/>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUElEQVR4nO2YTUhVQRTHf5ZQFEVRQZhFSAtbWAtXQhEhbWojuDAzFFq2koLIZbixj42L2gRBm8KN1aJyY+lCqaBwa1BEC+mDIFIs0bwxcIRhuG/mfrx3m1vzg7P68847/3tnzpm5EAgEAoFAIPDPcQB4AzzPqHvBMeALEEmk1b3gArCiFbnk0L0zsgG4YxT4FThu0b0z0gC8MIqbAfZbdO+MtAFzRmEjwCaL7p2RHmBRK2gVGALqKujeGamXgvVifgAdFt07IzuAcaOQWeCgRXfFAvAOmAIeAoPASWB7rUy0AO+NIp4C2yx6nliVodkP7KqWiU5g3vij68B6i17NWALuAU1ZDaiNe0WezlrSZeCsRY9qbOgGsDWNiS2yZs1kAw69iHgLHE5qpNIQa3ToRcUi0J3HyF5PjERybuvNurT6PVhakRa/gS6XmbjNrDbcGYv+N2JB2r+TuPZ6tcD2GyVsAJuTmGmRCaz/eEybwHF60XGNnEeUZoteZCwnXWJrh8JhI8F34JRFt4W6dO2Uqd0qh8+LwC1gWvZklCJGSck54JfRPS5rx3hTrxQuNgJH5Uj0IUE+1XgOpTUTd3G6X8OLVZ1cnx87OuVtMrAHeGkkUqfWfRY9qxGdVstQnpc5lxr1+u8ayT7Lkqik5zWiWAdckk1u5j1NCT8HtcfMMfXgcnEC+GYp1KVn5QjwU8v7SWs8mVGfRF8BExb9NfCM6tJnvBW1j0rLA83IeUpMs8w0ZeQmJeeRGJmk5HSLkY+UnN1iRB2RSs8T6ZyBQOB/4A9X840ICJ3pbwAAAABJRU5ErkJggg==" />
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdklEQVR4nO2Xu0rEQBSGTy0WPoKFiKibPIKtk4lY+xxiYSEKFoIim9hY2lnszsQLsggbFVQQQbCZeYG1E3wFj+zKgmj2CJvbDMwHf5v8XyaZOQFwOBwOh80Irp4EV53L8GUCbERyjf0Ipu5bS2oSrBUILJWQPwVslJC/BWyTkFkC33koTeJs9XUqCfWG5PpRcvU+LJEn4q8Atpm+LXx3SlbUWhLqjyTMX1r+I1C4hORqS4bqs1++KgEx+Cb0XW4JyfXOsHjlAsFAolVoeWsE5Ijy1b5CarxtlSpfmQArqXwlAizHgbY+fYxUxrpo9oPCTIG8p/HmzAlSMX6U2J49RSqlCbCC5qDduTZSMX6c3ps/RyrG/9DsL1whlaLuIwL9LAJ9UfjQdrDYQSpgOoeNa6QCptP0ukgFTKdpu0DkpUgFTCeyXsBPkQqYTmS7QOzfIBUwndgJ1EzsVqBmIj99I1ahB6Zz1EjZCIle7HWX6+7ncDgcYARfW2oNKJ9+n90AAAAASUVORK5CYII=" />
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENElEQVR4nO2dTWsUQRCG31Mw8SdkN5Ggoke9+HHViHhTEIy/IXrNUb0k8eoqnvSg4FeIHyR6UH+AIMZDctSDH+tJiTEaMJeShhoZliRTPZnp7a6tBxqx5rWp2s5297z2TADDMAzDMAzDMAzDMAzDMIweoA/AVQDfAFBBawOY4n9j1MS0YCA626SNRn20+UM+ItAezX1TjJogbnXpDU/IBqQe9gO4K1ycKXBzOd3hHHuCUwD+RPDBU0FzOZ6EcpoAlrngWwBGEB8jAG5zjsucs1oecaGPET9POFeXs0qO5aaCYcRPA8Aq55z01OUKmQHwa5O5eQLpMLFJDa62WQB7kMBg/IhgQaaCtpTLeakjlv1d0lytg4iYGU50LvZEt4mrbZ5rfYiIyaYpzYOR0eRafyJiVjhJN3Vpp5nCgMxykvPKB6UB4DnX6qbpaNkL4HsEizYFam5R343IGeSFLpu+NLYV/mZEPxgb8ZmLGEK6DHMNn6CA91zMAaTLQa5hAQp4xcWMIl1OcA0voYD7XMwY0uU813APCrjOxYx7nipp86GGvi7qM8a5BldL8lzmYtyfRUzzPcxgbq8/1UV9mRqi5wIX0xJo2x03lM2CUyN16zNaXIOrJXnGuBi3lhRBwlgofcYD1p2DAka5GLfbKoKEsbL6RU+9pp1iqT08CWNl9dI+NN5L/WeIi3F37KkOyBfWqTjwMMDFrEUwIB889RlrrHO1qEBaEAljofSOnR4/UOoMRhLGQi7qPlNuMkgXRRLGyuqlfag1Fn23jSSMldVL+1BrLPoajCSMhZyyfG5sk6ElNBhJGAulz1s/16AIqTlHwlgofT73S1CE1GAkYSyU3ve/D5JBOg+TMBZKr85Y9DUYSRgLpXe8Zs1xKEK6lydhLJRenbHoe7dLwlgovTpj0ddgJGEslD7vw/VDGRKDkYSxUHqVxqKPwUjCWCi9qhOLZRZHEsZC6VUaiz4GIwljofQqjUUfg5GEsVB6VScWy5xtImEslP6iRmPRx2AkYSyU/opGY9HHYCRhbKtrixX2r+rEYhmDkYQxybUq+ldpLPoYjCSMSa5V0b9KY9FnT0/CmORaFf2rNBZ9DEYSxiTXquhfpbHoYzCSMCa5VkX/ao1FqcFIwliIXZbPEVi1BiMJYyH0qo3FjIWCRZKEsRD6bBPyDoopMhhJGAuhV20sSg3G9gbPAH7dor869SpPLPqecZriJ2Mb/GG9KHh3e516VY9ClzUY+/hDa/NP7qTgufO69Koeha7iEeluo/LEYidnc+9kjJ05ztXlrJZ9ufdN7UC89OfeHxn9q2C3y1su9Abi5Sbn+AY9gPtFK+tc8FMAhyPxigb4F8U849z+AjiEHuEMgN9ceIxtFcBp9Bi7eCfzMfeNoS62dc6llfjrCA3DMAzDMAzDMAzDMAzDMAzDMAwDYv4BYc9fnuJt+5cAAAAASUVORK5CYII="/>
                <div className="mail-info">
                    <div className="mail-logo"></div>
                    <div className="mail-from">
                        <div className="mail-from-1">{selectedMail.From}</div>
                        <div className="mail-from-2">To: {selectedMail.To}</div>
                        <div className="mail-from-3">Cc: {selectedMail.Cc}</div>
                    </div>
                </div>
                <div className="mail-content" dangerouslySetInnerHTML={{ __html: selectedMail.Html }}></div>
                </div>
            </div>
  )}
}

export default See
