import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
    const [searchParam, setSearchParam] = useSearchParams();
    const sortBy = searchParam.get('sortBy') || '';

    function changeHandler(e) {
        searchParam.set('sortBy', e.target.value);
        setSearchParam(searchParam);
    }

    return <Select options={options} type="white" value={sortBy} onChange={changeHandler} />;
}

export default SortBy;
