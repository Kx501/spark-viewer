import { Dispatch, SetStateAction, useContext, useState } from 'react';
import TextBox from '../../../../components/TextBox';
import { useTranslation } from '../../../../hooks/useTranslation';
import SourceThreadVirtualNode from '../../node/SourceThreadVirtualNode';
import SamplerData from '../../SamplerData';
import {
    SourcesViewData,
    SourceViewData,
} from '../../worker/SourceViewGenerator';
import { LabelModeContext, MetadataContext } from '../SamplerContext';
import BaseNode from '../tree/BaseNode';
import LabelModeButton from './button/LabelModeButton';
import MergeModeButton from './button/MergeModeButton';
import SourcesViewHeader from './header/SourcesViewHeader';

export interface SourcesViewProps {
    data: SamplerData;
    viewData?: SourcesViewData;
    setLabelMode: Dispatch<SetStateAction<boolean>>;
}

// The sampler view in which there is a stack displayed for each known source.
export default function SourcesView({
    data,
    viewData,
    setLabelMode,
}: SourcesViewProps) {
    const { t } = useTranslation();
    const labelMode = useContext(LabelModeContext);
    const [merged, setMerged] = useState(true);
    const view = merged ? viewData?.sourcesMerged : viewData?.sourcesSeparate;

    return (
        <div className="sourceview">
            <SourcesViewHeader>
                <LabelModeButton
                    labelMode={labelMode}
                    setLabelMode={setLabelMode}
                />
                <MergeModeButton merged={merged} setMerged={setMerged} />
            </SourcesViewHeader>
            <hr />
            {!view ? (
                <TextBox>{t('common.loading')}</TextBox>
            ) : (
                <>
                    {view.map(viewData => (
                        <SourceSection
                            data={data}
                            viewData={viewData}
                            key={viewData.source}
                        />
                    ))}
                    <OtherSourcesSection
                        alreadyShown={view.map(s => s.source)}
                    />
                </>
            )}
        </div>
    );
}

const formatVersion = (version: string) => {
    return version.startsWith('v') ? version : 'v' + version;
};

interface SourceSectionProps {
    data: SamplerData;
    viewData: SourceViewData;
}

const SourceSection = ({ data, viewData }: SourceSectionProps) => {
    const { source, threads } = viewData;

    const metadata = useContext(MetadataContext)!;
    const sourceInfo = metadata.sources[source.toLowerCase()];

    return (
        <div className="stack">
            <h2>
                {source}{' '}
                {sourceInfo && (
                    <span className="version">
                        ({formatVersion(sourceInfo.version)})
                    </span>
                )}
            </h2>
            {threads.map(thread => (
                <BaseNode
                    parents={[]}
                    node={new SourceThreadVirtualNode(data, thread)}
                    key={thread.name}
                />
            ))}
        </div>
    );
};

const OtherSourcesSection = ({ alreadyShown }: { alreadyShown: string[] }) => {
    const { t } = useTranslation();
    const metadata = useContext(MetadataContext)!;
    if (!metadata.sources) {
        return null;
    }

    const otherSources = Object.values(metadata.sources).filter(
        source => !alreadyShown.includes(source.name)
    );

    if (!otherSources.length) {
        return null;
    }

    const sourceNoun = ['Fabric', 'Forge', 'NeoForge'].includes(
        metadata?.platform?.name!
    )
        ? t('viewer.mods')
        : t('viewer.plugins');

    return (
        <div className="other-sources">
            <h2>{t('viewer.other')}</h2>
            <p>
                {t('viewer.otherSourcesDescription', { sourceNoun })}
            </p>
            <ul>
                {otherSources.map(({ name, version }) => (
                    <li key={name}>
                        {name} <span>({formatVersion(version)})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
