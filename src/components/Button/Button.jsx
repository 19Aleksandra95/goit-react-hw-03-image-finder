import css from './Button.module.css';
import PropTypes from 'prop-types';



const Button =  ({loadMore}) => {
return (
    <button type="button" onClick={loadMore} className={css.Button}>
    load more
  </button>
);
};

Button.propTypes = {
loadMore: PropTypes.func.isRequired,
};

export default Button;