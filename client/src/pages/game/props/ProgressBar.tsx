interface ProgressBarProps {
    currentProgress: number;
    threshold: number;
    barColor: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentProgress, threshold, barColor }) => {
  const percentage = Math.min((currentProgress / threshold) * 100, 100);

  return (
    <div style={styles.container}>
        <div style={styles.barBackground}>
            <span style={styles.details}>
            {currentProgress} / {threshold}
            </span>

            <div style={styles.progressFill(percentage, barColor)} />
        </div>
    </div>
  );
};

const styles = {
    container: {
        width: '30%'
    } as React.CSSProperties,
    barBackground: {
        width: '100%',
        height: '16px',
        backgroundColor: '#333',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #444',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    } as React.CSSProperties,
    details: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#fff',
        zIndex: 2,
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        pointerEvents: 'none'
    } as React.CSSProperties,
    progressFill: (percentage: number, barColor: string) => ({
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: barColor,
        transition: 'width 0.3s ease-in-out',
        boxShadow: `0 0 8px ${barColor}`,
        zIndex: 1
    })


};


export default ProgressBar;