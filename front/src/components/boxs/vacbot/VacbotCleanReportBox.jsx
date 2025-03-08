const VacbotCleanReportBox = ({ children, ...props }) => {
    const { vacbotStatus } = props;
    const cleanReport = vacbotStatus.cleanReport;
    const chargeStatus = vacbotStatus.chargeStatus;
    return (
      <div class="vacbotReport">
        {cleanReport == 'idle' && <i class={`list-separated-item fe fe-disc`} />}
        {chargeStatus == 'returning' && <i class={`list-separated-item fe fe-dowload`} />}
        {cleanReport == 'auto' && <i class={`list-separated-item fe fe-play-circle`} />}
        {cleanReport == 'pause' && <i class={`list-separated-item fe fe-pause-circle`} />}
        {cleanReport == 'spot_area' && <i class={`list-separated-item fe fe-layers-circle`} />}
        {cleanReport == 'singleroom' && <i class={`list-separated-item fe fe-codepen-circle`} />}
  
        {cleanReport}
      </div>
    );
  };

  export default VacbotCleanReportBox;