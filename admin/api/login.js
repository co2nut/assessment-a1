import _ from 'lodash'
import axios from 'axios';

export const login = async(username, password)=> {
  return ({username, password})
  // return await axios.get(`${client.io.io.uri}carAdsFilter`,
  //     {
  //       params: {
  //         // match,
  //         // businessType: businessType,
  //         limit: PAGESIZE + skip,
  //         skip: skip,
  //       }
  //     }
  //   )
  //   .then((res) => {
  //     console.log({res});
  //     let data = res.data.modelList
  //     let stateArr = []
  //     res.data.modelList.map(i => {
  //       stateArr = stateArr.concat(i.state)
  //     })
  //     stateArr = stateArr.filter(distinctArr)
  //     return { data, stateArr, products:res.data.data }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     return null
  //   })

}