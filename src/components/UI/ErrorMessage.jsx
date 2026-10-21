export default function Error({title,message,onRetry}){
    return (
        <div className="error">
            <h2>{title}</h2>
            <p>{message}</p>

            {onRetry && (
        <button type="button" onClick={() => onRetry()}>
          Try again
        </button>
      )}
        </div>
    )
}