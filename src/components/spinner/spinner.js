function Spinner() {
  return (
    <div className="h-10 w-10 border-[3px] border-t-[4px] border-solid border-t-sa-maroon rounded-[50%] spin">
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .spin {
              animation: spin 1s linear infinite;
            }
          `}
      </style>
    </div>
  );
}

export default Spinner;