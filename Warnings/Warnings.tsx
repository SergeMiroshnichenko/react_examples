import React from "react";
import { useMutation } from "react-apollo";

import { Workflow, ApiResponse, MutationChangeDealArchivedStatusArgs } from "types/types.generated";

import { UserName } from "../../AddToFlowModal.styles";
import { ActionType, WarningType, SelectedUser } from "../../AddToFlowModal.interfaces";
import { UPDATE_CLIENT, UPDATE_DEAL, BULK_UPDATE_DEAL } from "./Warning.queries";
import Warning from "../Warning";
import { WarningStartCampaign } from "../Warning/Warning.styles";

interface WarningsProps {
  flow: Workflow;
  activeWarning: WarningType | null;
  activeFlow: Workflow | null;
  selectedUser: SelectedUser[];

  onUnselectUsers: () => void;
  onSetData: (flow: Workflow) => void;
  onSetFlow: (flow: Workflow | null) => void;
  onActiveAction: (flow: ActionType | null) => void;
  onActiveWarning: (warning: WarningType | null) => void;
  onSubmit: () => void;
  onCloseModal: () => void;
}

const Warnings: React.FunctionComponent<WarningsProps> = ({
  flow,
  activeWarning,
  activeFlow,
  selectedUser,

  onUnselectUsers,
  onSetData,
  onSetFlow,
  onActiveAction,
  onActiveWarning,
  onCloseModal,
  onSubmit,
}) => {
  const [updateUserSubscribtion] = useMutation<{ updateClient: ApiResponse }>(UPDATE_CLIENT);
  const [updateDeal] = useMutation<{ updateDeal: ApiResponse }>(UPDATE_DEAL);
  const [bulkUpdateDeal] = useMutation<{ changeDealArchivedStatus: ApiResponse }, MutationChangeDealArchivedStatusArgs>(
    BULK_UPDATE_DEAL,
  );

  const handleAcceptChangingFlow = () => {
    if (activeFlow === null) {
      return;
    }

    onSetData({ ...activeFlow });
    onActiveAction(null);
    onActiveWarning(null);
  };

  const handleDeclineChangingFlow = () => {
    onSetFlow(null);
    onActiveAction(null);
    onActiveWarning(null);
  };

  const handleAcceptFlowSwitching = () => {
    onActiveAction(ActionType.SELECT_FLOW);
    onActiveWarning(null);
  };

  const handleAcceptMultipleContactsFlowSwitching = () => {
    const archivedContacts = selectedUser.find(contact => !contact.activeDeal && !contact.unsubscribed);

    if (archivedContacts) {
      onActiveWarning(WarningType.WARNING_MULTIPLE_ARCHIVED);
    } else {
      onActiveAction(ActionType.SELECT_FLOW);
      onActiveWarning(null);
    }
  };
  const handleDeclineMultipleContactsFlowSwitching = () => {
    onUnselectUsers();
    onActiveWarning(null);
  };

  const handleDeclineCloseFlow = () => onActiveWarning(null);

  const handleAcceptCloseFlow = () => {
    onActiveWarning(null);
    onCloseModal();
  };

  const handleAcceptSubscribeContact = async () => {
    const { data: updateResponse } = await updateUserSubscribtion({
      variables: {
        id: selectedUser[0].id,
        info: {
          is_enabled: true,
        },
      },

      refetchQueries: [`fetchClientsList`],
    });

    if (updateResponse && updateResponse.updateClient.code_class === "ok_updated") {
      onActiveWarning(null);
    } else {
      // Close modal?
    }
  };

  const handleDeclineSubscribeContact = () => {
    onActiveWarning(null);
    onCloseModal();
  };

  const handleAcceptArchiveContact = async () => {
    const { data: updateResponse } = await updateDeal({
      variables: {
        id: selectedUser[0].dealId,
        data: {
          is_enabled: true,
        },
      },

      refetchQueries: [`fetchClientsList`],
    });

    if (updateResponse && updateResponse.updateDeal.code_class === "ok_updated") {
      // Check if user unsubscribed ? show warining about subscribing : close modal
      if (selectedUser[0].unsubscribed) {
        onActiveWarning(WarningType.WARNING_SUBSCRIBE_STATUS);
      } else {
        onActiveWarning(null);
      }
    } else {
      // Close modal?
    }
  };

  const handleAcceptArchiveMultipleContact = async () => {
    const archived = selectedUser.filter(user => !user.activeDeal && !user.unsubscribed);
    const clientIds = archived.map(user => user.id);
    const dealIds = archived.map(user => user.dealId);

    try {
      await bulkUpdateDeal({
        variables: {
          deal_ids: dealIds,
          client_ids: clientIds,
          is_enabled: true,
        },
      });

      onActiveAction(ActionType.SELECT_FLOW);
      onActiveWarning(null);
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.log(error);
    }
  };

  const handleDeclineArchiveContact = () => {
    onActiveWarning(null);
    onCloseModal();
  };

  const userName = selectedUser.length && selectedUser[0].name;
  const userNameFlowName = selectedUser.length && selectedUser[0].recentFlow && selectedUser[0].recentFlow.name;
  const activeFlowName = activeFlow && activeFlow.name;

  const contactsCount = selectedUser.reduce((total, user) => {
    if (!user.unsubscribed) {
      return (total += 1);
    }
    return total;
  }, 0);

  switch (activeWarning) {
    case WarningType.WARNING_FLOW_SETTINGS:
      return (
        <Warning
          title="Active in a Flow"
          description={`${userName} is already in ${userNameFlowName}`}
          question={`Would you like to move them from ${userNameFlowName} to a new flow?`}
          onDecline={() => onActiveWarning(null)}
          onAccept={handleAcceptFlowSwitching}
        />
      );

    case WarningType.WARNING_FLOW_MULTIPLE_IN_FLOW:
      const usersInFlow: number = selectedUser.reduce((total, user) => {
        if (user.recentFlow && user.recentFlow.isEnabled) {
          return (total += 1);
        }
        return total;
      }, 0);

      let description = `${usersInFlow} contacts are already in a flow`;
      if (usersInFlow === 1) {
        description = `${usersInFlow} contact is already in a flow`;
      }

      return (
        <Warning
          title="Active in a Flow"
          description={description}
          question={`Would you like to move them to a new flow?`}
          onDecline={handleDeclineMultipleContactsFlowSwitching}
          onAccept={handleAcceptMultipleContactsFlowSwitching}
        />
      );

    case WarningType.WARNING_FLOW_CHANGE:
      return (
        <Warning
          title="Flow Settings Warning!"
          description="Switching flows will override any changes you’ve made."
          question={`Are you sure you want to switch to ${activeFlowName}?`}
          onDecline={handleDeclineChangingFlow}
          onAccept={handleAcceptChangingFlow}
        />
      );

    case WarningType.WARNING_CLOSE_SETTINGS:
      let closeDescription = (
        <>
          <UserName>{userName}</UserName> will not be added to a flow and you will lose any changes that you’ve made if
          you close this window.
        </>
      );

      if (selectedUser.length > 1) {
        closeDescription = (
          <>
            <UserName>{contactsCount} contacts</UserName> will not be added to a flow and you will lose any changes that
            you’ve made if you close this window.
          </>
        );
      }
      return (
        <Warning
          title="Warning!"
          description={closeDescription}
          question="Are you sure you want to close this window?"
          onDecline={handleDeclineCloseFlow}
          onAccept={handleAcceptCloseFlow}
        />
      );

    case WarningType.WARNING_SUBSCRIBE_STATUS:
      return (
        <Warning
          title="Unsubscribed Contact"
          description={
            <>
              <UserName>{userName}</UserName> is an unsubscribed contact. You cannot add unsubscribed contacts to a
              flow.
            </>
          }
          question={
            <>
              Would you like to change <UserName>{userName}</UserName>’s status from “Unsubscribed” to “Subscribed”?
            </>
          }
          customDeclineText="Cancel"
          customAcceptText="Subscribe Contact"
          onDecline={handleDeclineSubscribeContact}
          onAccept={handleAcceptSubscribeContact}
        />
      );

    case WarningType.WARNING_ARCHIVED_STATUS:
      return (
        <Warning
          title="Contact Archived"
          description={
            <>
              <UserName>{userName}</UserName> is an archived contact. You cannot add archived contacts to a flow.
            </>
          }
          question={
            <>
              Would you like to move <UserName>{userName}</UserName> back to active leads?
            </>
          }
          customDeclineText="Cancel"
          customAcceptText="Move to Active"
          onDecline={handleDeclineArchiveContact}
          onAccept={handleAcceptArchiveContact}
        />
      );

    case WarningType.WARNING_MULTIPLE_ARCHIVED:
      const acrhivedContacts: number = selectedUser.reduce((total, user) => {
        if (!user.activeDeal) {
          return (total += 1);
        }
        return total;
      }, 0);

      let archivedDescription = (
        <>
          <UserName>{acrhivedContacts} contact</UserName> is archived. You cannot add archived contacts to a flow.
        </>
      );

      if (acrhivedContacts > 1) {
        archivedDescription = (
          <>
            <UserName>{acrhivedContacts} contacts</UserName> are archived. You cannot add archived contacts to a flow.
          </>
        );
      }

      return (
        <Warning
          title="Contacts Archived"
          description={archivedDescription}
          question={
            <>
              Would you like to move{" "}
              <UserName>
                {acrhivedContacts} contact{acrhivedContacts > 1 ? "s" : ""}
              </UserName>{" "}
              back to active leads?
            </>
          }
          customDeclineText="Cancel"
          customAcceptText="Move to Active"
          onDecline={handleDeclineArchiveContact}
          onAccept={handleAcceptArchiveMultipleContact}
        />
      );

    case WarningType.WARNING_ACCEPT_NEW_FLOW:
      return (
        <Warning
          title="Flow Confirmation"
          description="Switching flows will override any changes you’ve made."
          question={`Are you sure you want to switch to ${activeFlow && activeFlow.name}?`}
          onDecline={handleDeclineChangingFlow}
          onAccept={handleAcceptChangingFlow}
        />
      );

    case WarningType.WARNING_START_CAMPAIGN:
      return (
        <>
          <Warning
            title="Start Campaign"
            description={`You have selected ${contactsCount} contacts to add to ${flow.name} flow. Would you like the start the campaign?`}
            question={``}
            onDecline={handleDeclineChangingFlow}
            onAccept={onSubmit}
            noDivider={true}
          />
          <WarningStartCampaign isVisible={true}>
            <span>
              Your flow will be queued immediately or at the scheduled time, overriding the default schedule for the
              first action. Remaining actions will follow the default flow schedule.
            </span>
          </WarningStartCampaign>
        </>
      );

    default:
      return null;
  }
};

export default Warnings;
