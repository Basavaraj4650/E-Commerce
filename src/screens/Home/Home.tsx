import {Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getCatagaryList} from './service/home.services';

const Home = () => {
  const {data: catagaryList} = useQuery<any>(
    ['catagaray'],
    () => {
      return getCatagaryList();
    },
    {
      onSuccess: () => {
        console.log('Sucess--->');
      },
      onError: error => {
        console.log('error--->', JSON.stringify(error));
      },
    },
  );

  console.log('catagaryList---->', JSON.stringify(catagaryList));

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Home</Text>
    </View>
  );
};

export default Home;
