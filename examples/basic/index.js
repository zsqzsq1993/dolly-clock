import clock from '../../src/index.js'

const endTime = new Date(2020, 10, 8, 12, 45, 22)

clock(endTime, {
    selectingName: '#clock'
})
