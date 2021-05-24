
import React, { useState, useEffect } from 'react'
import { DataSearch, ReactiveBase, ReactiveList, ResultList, SelectedFilters } from '@appbaseio/reactivesearch'
import axios from 'axios'

import Tags from './Tags'
import Country from './Country'

const { ResultListWrapper } = ReactiveList

const ES_URL = process.env.REACT_APP_ES_URL
const ES_APP = process.env.REACT_APP_ES_SEARCH_INDEX

const App = () => {
  const [country, setCountry] = useState(['未登録'])

  useEffect(() => {
    fetchCountry().then(res => {
      setCountry(res)
    })
  }, [])

  return (
    <div>
      <ReactiveBase
        app={ES_APP}
        url={ES_URL}
      >
        <DataSearch
          componentId="search-component"
          dataField={["body"]}
          queryFormat="and"
        />
        <SelectedFilters />
        <ReactiveList
          dataField="body"
          componentId="news-body"
          pagination={true}
          size={10}
          react={{
            "and": ["search-component"]
          }}
          sortOptions={
            [{ label: "配信日時", dataField: "date", sortBy: "desc" }]
          }
        >
          {({ data, error, loading }) => (
            <ResultListWrapper>
              {
                data.map(item => (
                  <ResultList key={item._id}>
                    <ResultList.Content>
                      <ResultList.Title
                        dangerouslySetInnerHTML={{
                          __html: item.title
                        }}
                      />
                      <div>配信日時:{item.date}</div>
                      <ResultList.Description>
                        <div> {item.body} </div>
                      </ResultList.Description>
                      <Country id={item._id} options={country} defaultValue={item.country ?? '未登録'} onChange={updateCountry} />
                      <Tags id={item._id} options={item.tags} onChange={updateTags} />

                    </ResultList.Content>
                  </ResultList>
                ))
              }
            </ResultListWrapper>
          )}
        </ReactiveList>
      </ReactiveBase>
    </div>
  )
}

const fetchCountry = async () => {
  const res = await axios
    .post(ES_URL + '/' + ES_APP + '/_search', {
      "size": 0,
      "aggs": {
        "distinct_country": {
          "terms": { "field": "country.keyword" }
        }
      }
    })
  const result = res.data.aggregations.distinct_country.buckets.map(c => c.key)
  return result
}

const updateTags = (value) => {
  axios
    .post(ES_URL + '/' + ES_APP + '/_update/' + value.id, { "doc": { "tags": value.tags } })
    .then(res => {
      console.log(value.id + " のTag更新: " + value.tags)
    })
    .catch(error => {
      console.log(error, value.id)
    })
}

const updateCountry = (value) => {
  axios
    .post(ES_URL + '/' + ES_APP + '/_update/' + value.id, { "doc": { "country": value.country } })
    .then(res => {
      console.log(value.id + " のCountry更新: " + value.country)
    })
    .catch(error => {
      console.log(error, value.id)
    })

}

export default App