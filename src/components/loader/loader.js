import loaderStyles from './loader.module.css';

export function Loader() {
    return (
        <div className={loaderStyles.loaderBox}>
          <div className={loaderStyles.loader}></div>
          <div className={loaderStyles.loader}></div>
        </div>
    );
}