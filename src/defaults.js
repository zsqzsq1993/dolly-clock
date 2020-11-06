const width = window.innerWidth * 0.8

const height = window.innerWidth * 0.4

export default {
    selectingName: 'dolly-clock',

    maximum: (99 + 99 * 60 + 99 * 3600) * 1000,

    width,

    height,

    radius: window ? Math.round(width * 4 / 5 / 108) - 1 : 8,

    marginLeft: window ? Math.round(width / 10) : 30,

    marginTop: window ? Math.round(width / 7) : 60,

    color: '#4fc08d',

    colors: ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
}
