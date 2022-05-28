import styled from "@emotion/styled";

interface ProgressBarContainerProps {
  label?: string;
}

interface BarProps {
  percentage: number;
}

const ProgressBarContainer = styled.div<ProgressBarContainerProps>`
  position: relative;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.accent.primary};
  border-radius: 2px;
  height: 34px;
  width: 40rem;
  max-width: 100%;
  margin: 0.5rem;
  :before {
    content: "${(props) => props.label}";
    font-size: 0.8em;
    position: absolute;
    text-align: center;
    top: 5px;
    left: 0;
    right: 0;
  }
`;

const Bar = styled.div<BarProps>`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent.terniary};
  width: ${(props) => props.percentage}%;
  transition: width 1s linear;
`;

type ProgressBarProps = ProgressBarContainerProps &
  BarProps &
  Parameters<typeof ProgressBarContainer>[0];

function ProgressBar({
  percentage,
  label = "",
  ...props
}: ProgressBarProps): JSX.Element {
  if (percentage < 0 || percentage > 100)
    throw new Error("The property 'percentage' must be between 0 and 100.");

  return (
    <ProgressBarContainer label={label} {...props}>
      <Bar percentage={percentage} />
    </ProgressBarContainer>
  );
}

export default ProgressBar;
