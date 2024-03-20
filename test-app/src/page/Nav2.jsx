import React, { useState } from 'react'
import './Nav2.css'


function Nav2() {
    const [sideopen,setsideOpen] = useState(false)
  return (
    <div>
        <div  className={`Nav2 ${sideopen? 'active' : 'inactive'}`}>
        <div className={`div-1 ${sideopen? 'active' : 'inactive'}`}>
            <div className={`sub1 ${sideopen? 'active' : 'inactive'}`}></div>
            <div className="sub2"></div>
        </div>
        <div className="div-2"></div>
        </div>
        
            <div className='menu' onClick={()=>{setsideOpen(!sideopen)}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 30 30">
                <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                </svg>
            </div>
        {/* <div className="mail">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABhElEQVR4nO2YTUrDUBDHfxsheABp60HeSi8QT9CFXsKPA+hCj+BhFEHwCLrQE7izdaFQeRKYQEyblzRfncb5wUDIJPCfmfdeJgOGYRiG8Zcj4A74BLwSm4ummBKuFIj1JXYZynzywBdwCozRwxg4E22+qBL34kzEa+VcNCbLaYm5OEfoZSQaZ6uc6RrTji/SOZgAHHpxoQCexLEAboAIPUSiaREKIP/Qs5JqONGSJrd0qWdf+AFugV36JwKuM6JfgYOqezX/8htwSH+4QBLXOmz6rkZUkPUshQE8im1qb7jcWi86SGp/B7qqRlQh65V0Vllbbe8NVyMprXyJm1Zj3ax30krUrUbT4H3bvVBVQU2y3nkzlz+pXoApsCc2lXtttCq+y240W41VVjfrvbbTO8AJ8AC8iyXXx+Jrih/8/4B2vAWwYfxgKzATh6aBVp590fix5JFhkZcJmFYuQoOtODNaTCZgE/QwEfHfodEiMjj12zrcTYmlROmocavG64ZhGMb/4hdb+mhkX/6qJQAAAABJRU5ErkJggg==" />
            <div>New Mail</div>
        </div>
        <div className="delete">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nO2YTWxNQRiG31iINt1YED9hIZUgYUGINt36TSohXSAhLCoqLIlS3RA0YadBUju0NlZE27Dp1eiNYkO0wkpLmxArUVe4Msl7kqb5zvyf3hvum5zNfWa+b95z58zMN0BF/4bmAugA8AlA0fCMA7jEPmWjyxYDn/lcRBlpnIOqs2hbP+2fKBslbzWr9v+PgZzHXC4GGCh6PLmsDAzM0osacMhTUUk1BKAfpdcgH2d955yrQelUwzGosTjrAzvXonRayTG89+k8yM4NAtsA4BuAQ4YYeQDPDG0OM9Z6gTVwDF5T6D47NwlsH1mPIYbN/tDDNirmTDWRqbE4q5OdjwtsB1lvBAN9bLNdYCfIrsFD7ex8XmB1ZGqlCjWQZ5vNArtAdg4eOsLOXQJbTTYSwcAo26wSWBdZMzy0i50fCGwx2UQEA5Nss0hgD8ka4aFN7DwssCqynxEMTLHNPIG9INsIDy1n5zFDYmXG10A1uYqlK5SWwUOqZv0D4BeAOQKfYHA1nXwNLCH/LDCVs8AxeNfPX5lggcBGyNQH7WtgDflbgS0k+4IAvWGQtQIbsqiDTQbqyaXdeh3ZawToCYNsEVgvmdrUfA3sJH8ksK1kjxGgOwxywPEIYGtgP3m3wA6S3UaArjLISYHdIGsJMHCM/LrATpFd8Ri3VZDkMqs1wMAZcnVT5/LyrKX7G1vJlBFfAx3kpx2nr7V0H1ILmZpKvgZukh91XECspVvKbGoCk4F75Hsdl3Br6TYTm5rAZKBPUwvoNlFr6bZzm5rAZCCfUgskx5hCyjHGSWMpByqbmsBkYDSlFkgOkh8RQcMpR1qbmsBkYDKlFkiO8s8RQWlFRZXhKGxjYCrlSN7I31XuYN3SlHU5w2WriT9N4c3MqXIHK6iw9lS75kLBWUFXG57q1FzpOGsPg6k1e7bUz5y7YwRTy+dvAD8ArED2quXHrXIujRW0m29ErdvbWIzHVjV35HfMdTdm8PkAXk1bFrN+XjJn9DfUxgK8kMGgC4x91nBVU1FFiKi/W+ek+kwuenEAAAAASUVORK5CYII="/>
            <div>Delete</div>
        </div>
        <div className="archive">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO2WQQqDMBBF31ZykYL2SuINeh9XoUcqVC/S4jLdjBCKMVCNbeE/GEgyWfxMZoYBIX6csJP9v4BPkYCgL0BJiMoQNaJAwVbqzL7SihtgMGuOFtACj8g/AZcjBDjAR+d+Ye9KCTgBt8SL44iMwHlvAR3wtPUdqBfu1uYLdrcrMRFdM1lfAX2JiWhKJFmK9yTdJGBYKbM15jLdJMBnQp5jrhohSPECkCOXqzHDHwkAAAAASUVORK5CYII="/>
            <div>Archive</div>
        </div>
        <div className="move-to">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuUlEQVR4nO1Zz2sTQRSeonjxBx5V8CJSIYfsPNOKaLGIeOrZo/hX1ENb8eBF8SCSnRdr+wfYePUitBX1IF68KYJnxdbamsyL7W3k7czamGyapDSdXdkPBpZ9O/B97715u/kiRI4cOf4vFKrmkET9QCr9DZBMtyUV1QH1S6kaoyINkKjv90K8XYjeLIX1sTQI+GoJ1S718nzwaOO4RF2JhCj6fKNqDgifAJfRfvaM3zUHJdIXt/emyJoAhkS65arwUWRRwLitwmtA/UJkUUBqAAkCJNLb3UymPVhaKloKFE1kVYBpGtP3di3AF0qzdDJAmgTUW8ypp0qkSUAMUHTbvfWXRBYFjIZ0Iv5syaSAvnjlAgYEyCvgGZBXwDMgr4BnQF4Bz4C8Ap4BWaiArOjroPQc2zOAmqLF13wvzQKK5dqwNQS6/zIbwc0zqRIAYf0KIK07S+a7RJqSFQqKD81hXkFIEhRNc8w9s3IeGxdTIaBYrg3H5CXSs0K4cqTTs+fmfxyVihYcv/UR9fu0dwHStQ2TF8YMdd1gzBAgVR3HZa8CogOLtm2SMg9Kv5dKv0uqBLcR701spf0SEE8WiTSVGN+BByDNWPF6ri1o/X4ybGkMgPc2iWhUEpMo9isgOth274e2IFsXkQeDNDkA3m2JKjS1z04GGsf+aSN7f6NdnaIJG9RbkR9TbpxKhQBFb1oFdLRZ2MYbiD3YlMW9aCGJ9KljhrgSrp303vmb21kE1E/dFJruV4BEuuP80ifCFyDU1+Ixyi3RGudqNQuOceHx2jFAWrVeqb4qfAIUvXKVWejjRfbctc+i8A0If50FRT9du1STKtGS+Zj8WtePuv1CKayP/RVh37AzRSTg6cSLr13Pr8bkg0r9skgTgCuBtNzDFFtMTeaTwAdbop7l8eimn+Z/PXnadDqwfwBEaoAg3SuCawAAAABJRU5ErkJggg==" />
            <div>Move to</div>
        </div>
        <div className="read">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACZElEQVR4nO2YzUsWURSHn7IPoiiKCjNd5KJ9tihBWxQtxHbVQsyWRbRoVW4FN21bBq0ibCEaRC0iIgqrRYT/QAUFSYkVJoX24Y0bv4HB3pl3vu7MFeaBC/J67pnfuffOnHsO1NR4x3rgIvAMmNewf1/Q/7xmPzANmIgxLRsvOa3VtkJfA4NAq8agfjOysbbesA64CixL4CSwrYHdFmAstBvXgQ1UTLvOtxX0CxhOMOccsKg5L4F9VMRR4KOEvAcOp5jbBbzR3DmgjxJZo5X+IwH3gB0Z/NhjNiEfyzqGLThmF/BAD/0NjABrcy7GJeCnfD4G9uCIXuCDHjQLHC/Q9xFgRr4/AccK9P3fKj0B2iie3cDD0Ach7+7+YyswHjqn1xxn0xYJD96vu8D2rM4OrEg+JymPfuCznv0OOJTWwVnghxy8Ajopnw7ghTQs6hg3ZRNwI5Qtb+q3qtioYxvouQVsjpvwXIYLwAD+MCBNQfaOxKyCAEyc4crrr29HyCQNwL7E3z18iU3SAKr+jJ6I+IymCsDHRGbSBuDbVcJkCSCgx4PLnMkTgGVnCdfp1hz6mhs0KGju5yhoJlMWNIUEEFVSdifXzkHgbYaSstAA8hT1SxmLelN0AI3aKndi2iq3c7ZVjIsAAk6FGlu243BGn1s7hkJdiHnZZsFpAGW0Fo3rAFCmto3cKeAr8AV4CpwvIIubMgJwiakDqBhT74DvO/BNBs76kznYG8ojkTyS0WX8Y1jarMbYjlhQg15xVLikpU3ig/uT1RjLaEwmrXqMJo26X1sV7sVUNRakpenK19TUsPr4CxHbZyMnWV81AAAAAElFTkSuQmCC" />
            <div>Lu/Non-lu</div>
        </div> */}
    </div>
  )
}

export default Nav2
