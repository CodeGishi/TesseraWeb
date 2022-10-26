import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/test').catch((err) => {
  console.error('%% ~ err', err)
})

// import mongoose from 'mongoose'
// mongoose.connect('mongodb://mongo:27017/').catch((err) => {
//   console.error('%% ~ err', err)
// })
