import * as Icons from "react-icons/fa6";

const DynamicFaIcon = ({ name }) => {
    const IconComponent = Icons[name];

    if (!IconComponent) {
        return <Icons.FaBeer />;
    }

    return <IconComponent />;
};

export default DynamicFaIcon;
