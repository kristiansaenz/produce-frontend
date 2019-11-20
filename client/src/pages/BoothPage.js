import  React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  useParams
} from 'react-router-dom'
import BoothHeader from '../components/BoothHeader'
import ItemList from '../components/ItemList'
import ProfileMap from '../components/ProfileMap'
import { Tab } from 'semantic-ui-react'


const BoothPage = () => {


  const panes = [
    {
      menuItem: 'Produce',
      render: () => <Tab.Pane attached={false}><ItemList produce={booth.produce} /></Tab.Pane>,
    },
    // {
    //   menuItem: 'Map',
    //   render: () => <Tab.Pane attached={false}><ProfileMap farmers={farmer}/></Tab.Pane>,
    // },
    {
      menuItem: 'Reviews',
      render: () => <Tab.Pane attached={false}>No reviews yet</Tab.Pane>,
    },
  ]

  const [boothOwner, setBoothOwner] = useState({})
  const [booth, setBooth] = useState({})
  const [addressInfo, setAddressInfo] = useState({})

  let id = useParams()

  useEffect(() => {  
    //console.log("ID IS: ", id.id)
    const fetchData = async () => {
      const result = await axios.get(`/booths/${id.id}`)
      setBooth(result.data.booth);
      setAddressInfo(result.data.address);

      console.log("RESULT DATA: ", result.data)
      // axios.all([
      //   axios.get(`/booths/${id.id}`),
      //   axios.get(`/users/getUserByBoothId/${id.id}`)

      // ])
      // .then(responseArr => {
      //   setBooth(responseArr[0].data);
      //   setBoothOwner(responseArr[1].data);
      //   setAddressInfo(responseArr[0].data.address);
      // });
    };
    fetchData();
  }, []);

    return(
      <section class="section is-small is-farmer-page">
        <BoothHeader 
          boothOwnerName={boothOwner.name}
          avatar={boothOwner.avatar}
          boothImages={booth.images}
          boothName={booth.booth_name}
          description={booth.description}
          city={addressInfo.city}
          state={addressInfo.state}
        />
        <br/>

        {/* <nav class="level is-mobile is-produce-review-switch">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">Produce</p>
            </div>
            <div class="level-item">
              <p class="subtitle is-5">Reviews</p>
            </div>
          </div>
      </nav>
        

      <div class="booth-items-section">
        <ItemList produce={boothInfo.produce} />
      </div>

        <ProfileMap farmers={farmer}/> */}

      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    <ProfileMap booths={booth} />
    </section>
  );
}

export default BoothPage