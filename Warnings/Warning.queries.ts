import gql from "graphql-tag";

const UPDATE_CLIENT = gql`
  mutation updateClient($id: Int!, $info: ClientInfo!) {
    updateClient(id: $id, info: $info) {
      code
      code_class
      message
    }
  }
`;

const UPDATE_DEAL = gql`
  mutation updateDeal($id: Int!, $data: DealUpdate!) {
    updateDeal(id: $id, data: $data) {
      code
      code_class
      message
    }
  }
`;

const BULK_UPDATE_DEAL = gql`
  mutation changeDealArchivedStatus($deal_ids: [Int!]!, $client_ids: [Int!]!, $is_enabled: Boolean!) {
    changeDealArchivedStatus(deal_ids: $deal_ids, client_ids: $client_ids, is_enabled: $is_enabled)
  }
`;

export { UPDATE_CLIENT, UPDATE_DEAL, BULK_UPDATE_DEAL };
