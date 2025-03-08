const VacbotBatteryBox = ({ children, ...props }) => {
    const { vacbotStatus } = props;
    const batteryLevel = vacbotStatus.batteryLevel;
    const chargeStatus = vacbotStatus.chargeStatus;
  
    return (
      <div class="vacbotBatteryLevel">
        {chargeStatus == 'charging' && batteryLevel == 100 && <i class={`fe fe-battery-charging`} style="color: green;">{batteryLevel}% </i>}
        {chargeStatus == 'charging' && batteryLevel < 100 && <i class={`fe fe-battery-charging`} style="color: orange;">{batteryLevel}% </i>}
        {chargeStatus != 'charging' && (
          <i class={`fe fe-battery`} style={{ fontSize: '20px' }}>
            {batteryLevel}%
          </i>
        )}
      </div>
    );
  };

export default VacbotBatteryBox;