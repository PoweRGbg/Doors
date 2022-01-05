import '../css/herostyle.css';
import { isAuth } from "../hoc/AuthHoc";
import  AddHeroForm  from './AddHeroForm';

function AddHeroCard() {

    return (
        <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                                <AddHeroForm />

            </div>
        </div>
    );



}

const WrappedComponent = isAuth(AddHeroCard);
export default WrappedComponent;

