import { useState } from 'react';
import { WorldStatistics_GameRule } from '../../../proto/spark_pb';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface GameRulesProps {
    gameRules: WorldStatistics_GameRule[];
}

export default function GameRules({ gameRules }: GameRulesProps) {
    const { t } = useTranslation();
    
    const setRules = gameRules.filter(
        gameRule => !gameRuleIsDefaultInAllWorlds(gameRule)
    );

    const [showDefaults, setShowDefaults] = useState<boolean>(false);

    return (
        <div className="gamerules">
            {setRules.length === 0 && (
                <>
                    <p>{t('sampler.gameRules.allSetToDefault')}</p>
                </>
            )}
            {setRules.length > 0 && (
                <>
                    <h2>{t('sampler.gameRules.overrides')}</h2>
                    <span>
                        {t('sampler.gameRules.overridesDescription')}
                    </span>
                    <ul>
                        {setRules.map(gameRule => (
                            <li key={gameRule.name}>
                                {gameRule.name} (default:{' '}
                                <GameRuleValue value={gameRule.defaultValue} />)
                                <ul>
                                    {Object.entries(gameRule.worldValues)
                                        .filter(
                                            ([_, value]) =>
                                                value !== gameRule.defaultValue
                                        )
                                        .map(([worldName, value]) => (
                                            <li key={worldName}>
                                                {worldName}:{' '}
                                                <GameRuleValue value={value} />
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <button onClick={() => setShowDefaults(value => !value)}>
                {showDefaults ? t('sampler.gameRules.hide') : t('sampler.gameRules.showDefaults')}
            </button>

            {showDefaults && (
                <>
                    <h2>{t('sampler.gameRules.defaults')}</h2>
                <span>{t('sampler.gameRules.defaultsDescription')}</span>
                    <ul>
                        {gameRules.map(gameRule => (
                            <li key={gameRule.name}>
                                {gameRule.name}:{' '}
                                <GameRuleValue value={gameRule.defaultValue} />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

const GameRuleValue = ({ value }: { value: string }) => {
    if (value === 'true' || value === 'false') {
        return <span className={`value-${value}`}>{value}</span>;
    }
    if (/^-?\d+$/.test(value)) {
        return <span className="value-number">{value}</span>;
    } else {
        return <span className="value-string">{value}</span>;
    }
};

const gameRuleIsDefaultInAllWorlds = (gameRule: WorldStatistics_GameRule) => {
    const worldValuesSet = Array.from(
        new Set(Object.values(gameRule.worldValues))
    );
    return (
        worldValuesSet.length === 1 &&
        worldValuesSet[0] === gameRule.defaultValue
    );
};
