<template>
      <div class="w-full flex justify-between gap-2 rounded-lg bg-secondary-bg px-5 py-4 h-fit md:h-[200px] animate-pulse">
        <div class="flex flex-col h-full justify-between">
            <div class="w-full">
                <div
                    class="hover:bg-gradient-to-r from-tint/20  w-full transition-all text-xl md:text-3xl py-1 border-l-4 pl-3 border-tint font-semibold line-clamp-2 md:max-w-[70%]"></div>
                <div class="flex items-center gap-4">
                    <h4 class="py-1 text-xs sm:text-base md:text-lg font-semibold text-slate-400 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" id="calender">
                            <path fill="#fff"
                                d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z">
                            </path>
                        </svg>
                        <span></span>
                    </h4>
                    <div  class="py-1 font-semibold text-xs sm:text-base md:text-lgrounded-md w-fit flex gap-2 items-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" id="tag">
                            <path fill="#fff"
                                d="M21.12,10.71,12.71,2.29A1,1,0,0,0,12,2H3A1,1,0,0,0,2,3v9a1,1,0,0,0,.29.71l8.42,8.41a3,3,0,0,0,4.24,0L21.12,15a3,3,0,0,0,0-4.24Zm-1.41,2.82h0l-6.18,6.17a1,1,0,0,1-1.41,0L4,11.59V4h7.59l8.12,8.12a1,1,0,0,1,.29.71A1,1,0,0,1,19.71,13.53Z">
                            </path>
                        </svg>
                        <span></span>
                    </div>
                    <div class="pt-4  md:hidden lg:flex hidden pb-2 gap-2 items-center max-w-[80%]">
                        <div
                            class="bg-cyan-600 hover:scale-95 active:scale-90 transition-all text-sm py-1 px-3 rounded-md"></div>
                    </div>
                </div>
            </div>
            <div class="flex text-xs md:text-sm lg:text-base gap-4 pt-3 text-slate-400">
                <h5></h5>
                <span>|</span>
                <h6></h6>
            </div>
        </div>
        <div  class="h-full hidden md:block object-cover  rounded-md aspect-square bg-slate-200 " alt="" />
    </div>
</template>