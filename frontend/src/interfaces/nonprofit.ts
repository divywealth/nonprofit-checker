export interface NonprofitResult {
    organization_name: string;
    ein: string;
    address_line1?: string;
    city?: string;
    state?: string;
    zip?: string;
    bmf_status?: boolean;
    pub78_verified?: boolean;
    subsection_description?: string;
    foundation_type_description?: string;
    ofac_status?: string;
    organization_info_last_modified?: string;
}